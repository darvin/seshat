const seshatCompiled = require('./seshat.js');

exports.recognizeSCGInk = seshatCompiled.cwrap('recognizeSCGInk', 'string', ['string']);

exports.onInitialized = function(callback) {
	seshatCompiled.onRuntimeInitialized = callback;
}
