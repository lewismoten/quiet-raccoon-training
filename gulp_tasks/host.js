var module;

(function registerGulpTask(module){

	'use strict';

	var
		gulp 			= require('gulp'),
		webserver = require('gulp-webserver');

	module.exports = {
		register: register
	};

	return;

	function register() {
		gulp.task('host', run);
	}

	function run() {
		
		var root = ".",

			options = {

				directoryListing: {

					enable: true,
					path: root,
					options: undefined

				}
			
			};

		gulp.src(root)

			.pipe(webserver(options));

	}

})(module);