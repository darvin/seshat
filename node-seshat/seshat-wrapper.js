const seshatCompiled = require('./seshat.js');

exports.recognizeSCGInk = function(cgInkText) {
	const strippedText = cgInkText.replace('SCG_INK','').replace(/[\t\s\n]+/g,' ').trim();
	seshatCompiled.ccall('recognizeSCGInk', 'string', ['string'], [strippedText]);
}
exports.onInitialized = function(callback) {
	seshatCompiled.onRuntimeInitialized = callback;
}
