var probable = require('probable');
var renderSlimeIntelligences = require('../dom/render-slime-intelligences');
var Tablenest = require('tablenest');
var tablenest = Tablenest();
var range = require('d3-array').range;

var baseTable = probable.createTableFromSizes([
  [1, 'Ice'],
  [1, 'Water'],
  [2, 'Fire'],
  [1, 'Earth'],
  [1, 'Mist'],
  [1, 'Void'],
  [2, 'Slime'],
  [1, 'Smoke'],
  [1, 'Growth'],
  [1, 'Digestion'],
  [1, 'Enzyme'],
  [1, 'Decay'],
  [1, 'Spread'],
  [1, 'Absorb'],
  [1, 'Mud'],
  [1, 'Mold'],
  [1, 'Fungus'],
  [1, 'Drip'],
  [1, 'Mental'],
  [1, 'Eat']
]);

var colorsForBases = {
  Ice: 'lightblue',
  Water: 'blue',
  Fire: 'red',
  Earth: 'brown',
  Mist: 'white',
  Void: '#888',
  Slime: 'green',
  Smoke: '#999',
  Growth: 'yellow',
  Digestion: 'orange',
  Enzyme: 'purple',
  Decay: '#bbb',
  Spread: 'turquiose',
  Absorb: 'magenta',
  Mud: 'brown',
  Mold: '#8f0',
  Fungus: 'gray',
  Drip: '#00a',
  Mental: 'purple',
  Eat: 'brown'
};

var effectsForBases = {
  Ice: 'become numb and unable to perform fine motor skills',
  Water: 'all fires go out; clothes are soaked',
  Fire: 'lose one random flammable item',
  Earth: 'mild concussion, will vomit if hit this round',
  Mist: 'blinded',
  Void: 'get entranced by a vision of a black hole',
  Slime: 'make DEX check or slip and fall',
  Smoke: 'cough uncontrollably, unable to act',
  Growth: 'body hair grows 1"',
  Digestion: 'one unit of food melts',
  Enzyme: 'saliva becomes extremely thick; unable to speak',
  Decay: 'disease causes 1d3 damage per hour',
  Spread: 'nothing, no damage even',
  Absorb: 'nothing, no damage even',
  Mud: 'make DEX check or slip and fall',
  Mold: 'infected, 1d3 damage per hour',
  Fungus: 'hallucinate, always gets directions wrong',
  Drip: 'make DEX check or slip and fall',
  Mental: 'relive bad memory, -1 to everything',
  Eat: 'feel hunger, must spend the round eating'
};

var slimeIntelligences = [];
function makeSlimeIntelligencesFlow() {
  slimeIntelligences.push(getSlimeIntelligence());
  renderSlimeIntelligences(slimeIntelligences);
}

function getSlimeIntelligence() {
  var base = baseTable.roll();
  var slimeDef = {
    root: [[1, '{"name": "{name}",\n"intelligences": {ints}}']],
    name: [[4, '{base}{suffix}'], [1, '{prefix}{base}']],
    suffix: [
      [10, 'ly'],
      [3, ' {friendlike}'],
      [8, 'eo'],
      [4, 'ulo'],
      [5, 'sy'],
      [5, 'ora'],
      [2, 'sight'],
      [1, 'bato'],
      [2, 'tra'],
      [1, 'ai'],
      [1, 'IQ'],
      [3, 'Hub'],
      [2, 'uten'],
      [6, 'on'],
      [5, 'Up'],
      [2, 'is'],
      [2, 'ize'],
      [3, 'stack'],
      [3, 'ate'],
      [4, 'urate'],
      [3, 'works'],
      [5, 'vy'],
      [5, 'os'],
      [5, 'ics'],
      [6, 'ful'],
      [5, 'alyze'],
      [2, 'vi'],
      [3, ' Zero'],
      [2, 'mo'],
      [1, 'zyme']
    ],
    prefix: [
      [3, 'Omni'],
      [1, 'Jabber'],
      [2, 'On'],
      [1, 'Confident'],
      [3, 'Bio'],
      [2, 'Crypto']
    ],
    friendlike: [[5, 'Buddy'], [5, 'Pal'], [4, 'Friend'], [3, 'Companion']],
    base: [[1, base]],
    ints: [[4, 2], [3, 3], [2, 4], [1, 5]]
  };

  var slimeTable = tablenest(slimeDef);
  var slimeJSON = slimeTable.roll();
  var slime = JSON.parse(slimeJSON);
  slime.base = base;
  addDerivedPropeties(slime);
  return slime;
}

function addDerivedPropeties(slime) {
  slime.INT = slime.intelligences + 2;
  slime.cubicFt = slime.intelligences * 3;
  slime.AC = 8;
  slime.HD = ~~(slime.intelligences / 2);
  slime.maxHP = range(slime.HD).reduce(sum => sum + probable.rollDie(8), 0);
  slime.hp = slime.maxHP;
  slime.THAC0 = 21 - slime.HD;
  slime.absorbDmg = roundToDie(slime.intelligences);
  slime.mist = getMistAttack(slime.base, slime.intelligences);
  slime.color = colorsForBases[slime.base];
}

function getMistAttack(base, ints) {
  var form = 'cloud';
  var damage = roundToDie(ints / 2);
  var effect = effectsForBases[base];
  if (
    ['Water', 'Slime', 'Digestion', 'Enzyme', 'Mud', 'Drip'].indexOf(base) !==
    -1
  ) {
    form = 'spray';
  }
  var desc = `${base} ${form}: save vs. poison or ${damage} and ${effect}`;
  return desc;
}

function roundToDie(n) {
  return `1d${~~(n / 2) * 2}`;
}

module.exports = makeSlimeIntelligencesFlow;
