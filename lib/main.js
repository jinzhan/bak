const fse = require('fs-extra');
const path = require('path');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
.option('suffix', {
    alias: 's',
    type: 'string',
    default: '.bak',
    description: 'suffix'
  })
.argv;

const filePath = argv._[0];

if (!filePath) {
    console.log('No filePath supplied!');
    process.exit();
}

const realPath = path.join(process.cwd(), filePath);

try {
    fse.accessSync(realPath);
}
catch (e) {
    console.log(e);
    process.exit(1);
}

const {suffix} = argv;

if (!suffix) {
    console.log('No suffix supplied!');
    process.exit();
}

if (!/^[\w.-]+$/.test(suffix)) {
    console.log('Suffix is illegal!');
    process.exit(1);
}

const target = realPath + suffix;

fse.copySync(realPath, target);

console.log(`${realPath} -> ${target}`);
