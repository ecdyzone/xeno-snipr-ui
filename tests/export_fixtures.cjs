// Exercise the page's export functions without a browser or frontend dependencies.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'snipr_builder.html'), 'utf8');
const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
const nodes = {};
const context = vm.createContext({
    document: {
        documentElement: { dataset: { theme: 'dark' } },
        getElementById: id => nodes[id] ??= { value: '0', setAttribute() {} }
    },
    localStorage: { setItem() {} },
    window: {}
});
vm.runInContext(fs.readFileSync(path.join(root, 'snipr_modules.js'), 'utf8') + '\n' + script, context);
const run = code => vm.runInContext(code, context);
const records = [];
function capture(name) {
    run('updateReceptor()');
    const assembly = run('getAssembly()');
    const expected = run('Object.keys(colorMapping).map(mod => selectedModule(mod).sequence).join("")');
    assert.equal(assembly.sequence, expected);
    assert.equal(nodes['sequence-body'].innerHTML.replace(/<[^>]*>/g, ''), expected);
    records.push({ caseName: name, ...assembly, fasta: run('formatFasta(getAssembly())'), gp: run('formatGenPept(getAssembly())') });
}
for (let lbd = 0; lbd < 4; lbd++) {
    for (let ecd = 0; ecd < 2; ecd++) {
        for (let tmd = 0; tmd < 4; tmd++) {
            for (let jmd = 0; jmd < 4; jmd++) {
                for (const [mod, index] of Object.entries({ LBD: lbd, ECD: ecd, TMD: tmd, JMD: jmd })) {
                    run(`document.getElementById('select-${mod}').value = '${index}'`);
                }
                capture(`library-${lbd}-${ecd}-${tmd}-${jmd}`);
            }
        }
    }
}
for (const sequence of [
    'A', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'MALPVTALLLPLALLLHAARP', 'EQKLISEEDL',
    'MALPVTALLLPLALLLHAARPEQKLISEEDL',
    'MALPVTALLLPLALLLHAARPEQKLISEEDLACDEFG',
    'MALPVTALLLPLALLLHAARPACDEFG', 'EQKLISEEDLACDEFG', 'ACDEQKLISEEDLFG'
]) {
    run(`customModules.LBD = parseCustomModule('Custom "quoted" <name>', ${JSON.stringify(sequence)});
        document.getElementById('select-LBD').value = 'custom';`);
    capture(`custom-${sequence}`);
}
for (const mod of ['LBD', 'ECD', 'TMD', 'JMD', 'PAYLOAD']) {
    run(`customModules.${mod} = parseCustomModule('Long name with "quotes" & punctuation ' + 'X'.repeat(20), 'ACDEFG');
        document.getElementById('select-${mod}').value = 'custom';`);
}
capture('all-custom');

// Verify the actual download handler selects GenPept content and its extension.
let blob, link;
context.Blob = class { constructor(parts) { blob = parts.join(''); } };
context.URL = { createObjectURL: () => 'blob:test', revokeObjectURL() {} };
context.setTimeout = fn => fn();
context.document.createElement = () => link = { click() {}, remove() {} };
context.document.body = { appendChild() {} };
run("exportReceptor('GenPept')");
assert(link.download.endsWith('.gp'));
assert.equal(blob, records.at(-1).gp);
run("exportReceptor('FASTA')");
assert(link.download.endsWith('.fasta'));
assert.equal(blob, records.at(-1).fasta);
process.stdout.write(JSON.stringify(records));
