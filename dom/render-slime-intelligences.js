var d3 = require('d3-selection');
var accessor = require('accessor')();

var root = d3.select('#slime-intelligences-root');

function renderSlimeIntelligences(slimeData) {
  console.log(slimeData);
  var slimeIntelligences = root
    .selectAll('.slime-intelligence')
    .data(slimeData);
  slimeIntelligences.exit().remove();

  if (slimeData.length < 1) {
    return;
  }
  var exampleSlimeIntelligence = slimeData[0];
  var newSlimeIntellgences = slimeIntelligences
    .enter()
    .append('li')
    .classed('slime-intelligence', true);
  var tables = newSlimeIntellgences.append('table');
  for (let field in exampleSlimeIntelligence) {
    let rows = tables.append('tr').classed(field, true);
    rows
      .append('td')
      .text(field)
      .classed('field-name', true);
    rows.append('td').classed('field-value', true);
  }

  var updateSlimeIntelligences = newSlimeIntellgences.merge(slimeIntelligences);
  for (let field in exampleSlimeIntelligence) {
    updateSlimeIntelligences
      .select(`.${field} .field-value`)
      .text(accessor(field));
  }
}

module.exports = renderSlimeIntelligences;
