var handleError = require('handle-error-web');
var wireControls = require('./dom/wire-controls');
var makeSlimeIntelligencesFlow = require('./flows/make-slime-intelligences-flow');

(function go() {
  window.onerror = reportTopLevelError;
  wireControls({ makeSlimeIntelligences: makeSlimeIntelligencesFlow });
})();

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
