"""Run with: python -m unittest discover -s tests (requires Biopython and Node)."""
import io
import json
from pathlib import Path
import subprocess
import unittest
import warnings

from Bio import SeqIO


class ProteinExportTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        fixture_script = Path(__file__).with_name('export_fixtures.cjs')
        cls.fixtures = json.loads(subprocess.check_output(['node', str(fixture_script)], text=True))

    def test_protein_records_round_trip(self):
        for fixture in self.fixtures:
            with self.subTest(fixture=fixture['caseName']), warnings.catch_warnings():
                warnings.simplefilter('error')
                protein = SeqIO.read(io.StringIO(fixture['gp']), 'genbank')
                fasta = SeqIO.read(io.StringIO(fixture['fasta']), 'fasta')
                self.assertEqual(str(protein.seq), fixture['sequence'])
                self.assertEqual(protein.seq, fasta.seq)
                self.assertEqual(fasta.description, fixture['name'])
                self.assertEqual(protein.annotations['molecule_type'], 'protein')
                self.assertEqual(protein.annotations['topology'], 'linear')
                self.assertEqual(protein.annotations['data_file_division'], 'SYN')
                self.assertEqual(protein.id, 'SNIPR')
                self.assertEqual([feature.type for feature in protein.features[:2]], ['source', 'Protein'])
                self.assertNotIn('mol_type', protein.features[0].qualifiers)
                self.assertEqual(protein.features[1].extract(protein.seq), protein.seq)

                regions = protein.features[2:]
                self.assertEqual(len(regions), len(fixture['features']))
                self.assertEqual(''.join(str(region.extract(protein.seq)) for region in regions), fixture['sequence'])
                for region, expected in zip(regions, fixture['features']):
                    self.assertEqual(region.type, 'Region')
                    self.assertEqual(int(region.location.start) + 1, expected['start'])
                    self.assertEqual(int(region.location.end), expected['end'])
                    self.assertEqual(str(region.extract(protein.seq)), expected['item']['sequence'])
                    self.assertEqual(region.qualifiers['region_name'], [expected['item']['label'] + ': ' + expected['item']['name']])
                    self.assertEqual(region.qualifiers['note'][-1], 'Reference: ' + expected['item']['reference'])

                # Check a second serialization preserves sequence and region boundaries.
                # Biopython rewraps long reference URLs with spaces, so compare the
                # original reference values above, before its writer changes them.
                rewritten = SeqIO.read(io.StringIO(protein.format('genbank')), 'genbank')
                self.assertEqual(rewritten.seq, protein.seq)
                for original, reparsed in zip(protein.features, rewritten.features):
                    self.assertEqual(reparsed.type, original.type)
                    self.assertEqual(reparsed.location, original.location)
                    self.assertEqual(reparsed.qualifiers.get('region_name'), original.qualifiers.get('region_name'))

    def test_library_boundaries(self):
        for fixture in self.fixtures[:128]:
            with self.subTest(fixture=fixture['caseName']):
                features = fixture['features']
                self.assertEqual(len(features), 7)
                self.assertEqual([f['module'] for f in features], ['SP', 'MYC', 'LBD', 'ECD', 'TMD', 'JMD', 'PAYLOAD'])
                self.assertEqual((features[0]['start'], features[0]['end']), (1, 21))
                self.assertEqual((features[1]['start'], features[1]['end']), (22, 31))
                self.assertEqual(features[2]['start'], 32)
                self.assertEqual(features[0]['item']['sequence'], 'MALPVTALLLPLALLLHAARP')
                self.assertEqual(features[1]['item']['sequence'], 'EQKLISEEDL')

    def test_custom_boundaries(self):
        expected_modules = [
            ['LBD'], ['LBD'], ['SP'], ['MYC'], ['SP', 'MYC'],
            ['SP', 'MYC', 'LBD'], ['SP', 'LBD'], ['MYC', 'LBD'], ['LBD']
        ]
        for fixture, expected in zip(self.fixtures[128:-1], expected_modules):
            with self.subTest(fixture=fixture['caseName']):
                actual = [f['module'] for f in fixture['features'] if f['module'] in {'SP', 'MYC', 'LBD'}]
                self.assertEqual(actual, expected)
        self.assertEqual(len(self.fixtures[-1]['features']), 5)


if __name__ == '__main__':
    unittest.main()
