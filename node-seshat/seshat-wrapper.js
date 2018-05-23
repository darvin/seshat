var seshatCompiledLoadedRef;
const seshatCompiled = require('./seshat.js');

exports.recognizeSCGInk = function(cgInkText) {
	const strippedText = cgInkText.replace('SCG_INK','').replace(/[\t\s\n]+/g,' ').trim();
		// console.log(seshatCompiledLoadedRef);
	return seshatCompiledLoadedRef.ccall('recognizeSCGInk', 'string', ['string'], [strippedText]);
}
exports.onInitialized = function(callback) {
	// console.log(seshatCompiled);
	seshatCompiled().then(function(Module) {
		seshatCompiledLoadedRef = Module;
  callback();
});
}
