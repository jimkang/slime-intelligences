var listenersInit = false;

var slimeIntelligencesButton = document.getElementById('make-button');

function wireControls({ makeSlimeIntelligences }) {
  if (listenersInit) {
    return;
  }
  listenersInit = true;

  slimeIntelligencesButton.addEventListener('click', makeSlimeIntelligences);
}

module.exports = wireControls;
