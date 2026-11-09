// Regiões N-terminais reconhecidas na visualização e nas anotações GenPept.
const sniprNterminalRegions = [
  {
    module: "SP",
    name: "N-terminal CD8a signal peptide",
    sequence: "MALPVTALLLPLALLLHAARP",
    score: 0,
    reference: "Zhu et al. 2022 (Method Details)",
    length: 21,
    description: "Peptídeo sinal CD8a"
  },
  {
    module: "MYC",
    name: "myc-tag",
    sequence: "EQKLISEEDL",
    score: 0,
    reference: "Zhu et al. 2022 (Method Details)",
    length: 10,
    description: "Tag myc"
  }
];

// Biblioteca padrão de módulos. Carregada como script para funcionar também via file://.
        // Dados brutos extraídos diretamente do seu snipr_modules.csv
        const sniprDatabase = {
  "LBD": [
    {
      "name": "CD45 scFv (BC8 apamistamab)",
      "sequence": "MALPVTALLLPLALLLHAARPEQKLISEEDLEVKLLESGGGLVQPGGSLKLSCAASGFDFSRYWMSWVRQAPGKGLEWIGEINPTSSTINFTPSLKDKVFISRDNAKNTLYLQMSKVRSEDTALYYCARGNYYRYGDAMDYWGQGTSVTVSSGGGGSGGGGSGGGGSGGGGSDIALTQSPASLAVSLGQRATISCRASKSVSTSGYSYLHWYQQKPGQPPKLLIYLASNLESGVPARFSGSGSGTDFTLNIHPVEEEDAATYYCQHSRELPFTFGSGTKLEIK",
      "score": 0.0,
      "reference": "https://www.imgt.org/mAb-DB/mAbcard?AbId=633",
      "length": 283,
      "description": "CD8_signalpeptide_myc-tag_CD45apamistamab-scFv"
    },
    {
      "name": "CD3 scFv (OKT3 muromonab)",
      "sequence": "MALPVTALLLPLALLLHAARPEQKLISEEDLQVQLQQSGAELARPGASVKMSCKASGYTFTRYTMHWVKQRPGQGLEWIGYINPSRGYTNYNQKFKDKATLTTDKSSSTAYMQLSSLTSEDSAVYYCARYYDDHYCLDYWGQGTTLTVSSGGGGSGGGGSGGGGSQIVLTQSPAIMSASPGEKVTMTCSASSSVSYMNWYQQKSGTSPKRWIYDTSKLASGVPAHFRGSGSGTSYSLTISGMEAEDAATYYCQQWSSNPFTFGSGTKLEIN",
      "score": 0.0,
      "reference": "https://opig.stats.ox.ac.uk/webapps/sabdab-sabpred/therasabdab/therasummary/?INN=Muromonab",
      "length": 272,
      "description": "CD8_signalpeptide_myc-tag_CD3muromonab-scFv"
    },
    {
      "name": "VEGF",
      "sequence": "MALPVTALLLPLALLLHAARPEQKLISEEDLDIQMTQSPSSLSASVGDRVTITCRASQDVSTAVAWYQQKPGKAPKLLIYSASFLYSGVPSRFSGSGSGTDFTLTISSLQPEDFATYYCKQGYANPWTFGQGTKVEIKGGGGSGGGGSGGGGSEVQLVESGGGLVQPGGSLRLSCAASGFTISDYWIHWVRQAPGKGLEWVAGITPAGGYTYYADSVKGRFTISADTSKNTAYLQMNSLRAEDTAVYYCARFVFFLPYAMDYWGQGTLVTVSS",
      "score": 0.0,
      "reference": "Piraner2024",
      "length": 273,
      "description": "CD8_signalpeptide_myc-tag_VEGF-scFv"
    },
    {
      "name": "TGFbeta",
      "sequence": "MALPVTALLLPLALLLHAARPEQKLISEEDLQVQLVQSGAEVKKPGSSVKVSCKASGYTFSSNVISWVRQAPGQGLEWMGGVIPIVDIANYAQRFKGRVTITADESTSTTYMELSSLRSEDTAVYYCALPRAFVLDAMDYWGQGTLVTVSSGGGGSGGGGSGGGGSETVLTQSPGTLSLSPGERATLSCRASQSLGSSYLAWYQQKPGQAPRLLIYGASSRAPGIPDRFSGSGSGTDFTLTISRLEPEDFAVYYCQQYADSPITFGQGTRLEIK",
      "score": 0.0,
      "reference": "Piraner2024",
      "length": 274,
      "description": "CD8_signalpeptide_myc-tag_TGFB-scFv"
    }
  ],
  "ECD": [
    {
      "name": "CD8a_Hinge_V2",
      "sequence": "TTTPAPRPPTPAPTIASQPLSLRPEAC",
      "score": 0.0,
      "reference": "Zhu et al. 2022 (Table S2)",
      "length": 27,
      "description": ""
    },
    {
      "name": "Notch1_LNR",
      "sequence": "ILDYSFGGGAGRDIPPPLIEEACELPECQEDAGNKVCSLQCNNHACGWDGGDCSLNFNDPWKNCTQSLQCWKYFSDGHCDSQCNSAGCLFDGFDCQRAEGQCNPLYDQYCKDHFSDGHCDQGCNSAECEWDGLDCAEHVPERLAAGTLVVVVLMPPEQLRNSSFHFLRELSRVLHTNVVFKRDAHGQQMIFPYYGREEELRKHPIKRAAEGWAAPDALLGQVKASLLPGGSEGGRRRRELDPMDVRGSIVYLEIDNRQCVQASSQCFQSATDVAAFLGALASLGSLNIPYKIEAVQSETVEPPPPAQLH",
      "score": 0.0,
      "reference": "Zhu et al. 2022 (Table S2)",
      "length": 309,
      "description": "Notch1 NRR from human Notch1"
    }
  ],
  "TMD": [
    {
      "name": "NOTCH2tmd",
      "sequence": "LLYLLAVAVVIILFIILLGVIMA",
      "score": 28.55,
      "reference": "Zhu et al. 2022 (Table S4)",
      "length": 23,
      "description": ""
    },
    {
      "name": "NOTCH3",
      "sequence": "LPLLVAGAVLLLVILVLGVMVA",
      "score": 26.43,
      "reference": "Zhu et al. 2022 (Table S4)",
      "length": 22,
      "description": ""
    },
    {
      "name": "NOTCH1",
      "sequence": "FMYVAAAAFVLLFFVGCGVLLS",
      "score": 24.22,
      "reference": "Zhu et al. 2022 (Table S4)",
      "length": 22,
      "description": ""
    },
    {
      "name": "CLSTN1",
      "sequence": "IATVVIIISVCMLVFVVAMGVY",
      "score": 23.1,
      "reference": "Zhu et al. 2022 (Table S4)",
      "length": 22,
      "description": ""
    }
  ],
  "JMD": [
    {
      "name": "DAG1",
      "sequence": "RKKRKGK",
      "score": 58.64,
      "reference": "Zhu et al. 2022 (Table S5)",
      "length": 7,
      "description": ""
    },
    {
      "name": "NRG2",
      "sequence": "KTKKQRKQMHNHLR",
      "score": 53.68,
      "reference": "Zhu et al. 2022 (Table S5)",
      "length": 14,
      "description": ""
    },
    {
      "name": "NRG1",
      "sequence": "KTKKQRKKLHDRLR",
      "score": 36.61,
      "reference": "Zhu et al. 2022 (Table S5)",
      "length": 14,
      "description": ""
    },
    {
      "name": "NOTCH2",
      "sequence": "KRKRKH",
      "score": 22.25,
      "reference": "Zhu et al. 2022 (Table S5)",
      "length": 6,
      "description": "Notch2 c-terminal JMD"
    }
  ],
  "PAYLOAD": [
    {
      "name": "G4VP64",
      "sequence": "MKLLSSIEQACDICRLKKLKCSKEKPKCAKCLKNNWECRYSPKTKRSPLTRAHLTEVESRLERLEQLFLLIFPREDLDMILKMDSLQDIKALLTGLFVQDNVNKDAVTDRLASVETDMPLTLRQHRISATSSSEESSNKGQRQLTVSAAAGGSGGSGGSDALDDFDLDMLGSDALDDFDLDMLGSDALDDFDLDMLGSDALDDFDLDMLGS",
      "score": 0.0,
      "reference": "Zhu et al. 2022 (Table S2)",
      "length": 211,
      "description": "Gal4DBD_VP64"
    }
  ]
};

