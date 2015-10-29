var module;

(function displaySignature(module, console){

	'use strict';

	var version = '1.0';

	console.log(version);

	if(module.exports) {
		module.exports = version;
	}

}).call(this, module || {}, console);