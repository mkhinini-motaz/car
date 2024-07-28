const inquirer = require('inquirer');
const fs = require('fs');

const prompt = inquirer.createPromptModule();

const en = JSON.parse(fs.readFileSync(__dirname + '/en.json'));
const fr = JSON.parse(fs.readFileSync(__dirname + '/fr.json'));
const tnfr = JSON.parse(fs.readFileSync(__dirname + '/tnfr.json'));
const tnar = JSON.parse(fs.readFileSync(__dirname + '/tnar.json'));
const ar = JSON.parse(fs.readFileSync(__dirname + '/ar.json'));

const answers = prompt([
  {type: 'input', name: 'key', message: 'Translation key'},
  {type: 'input', name: 'en', message: 'Translation en :'},
  {type: 'input', name: 'fr', message: 'Translation fr :'},
  {type: 'input', name: 'tnfr', message: 'Translation tnfr :'},
  {type: 'input', name: 'tnar', message: 'Translation tnar :'},
  {type: 'input', name: 'ar', message: 'Translation ar :'},
]).then(answers => {
  en[answers.key] = answers.en;
  fs.writeFileSync(__dirname + '/en.json', JSON.stringify(en, null, 4));

  fr[answers.key] = answers.fr;
  fs.writeFileSync(__dirname + '/fr.json', JSON.stringify(fr, null, 4));

  tnfr[answers.key] = answers.tnfr;
  fs.writeFileSync(__dirname + '/tnfr.json', JSON.stringify(tnfr, null, 4));

  tnar[answers.key] = answers.tnar;
  fs.writeFileSync(__dirname + '/tnar.json', JSON.stringify(tnar, null, 4));

  ar[answers.key] = answers.ar;
  fs.writeFileSync(__dirname + '/ar.json', JSON.stringify(ar, null, 4));
});
