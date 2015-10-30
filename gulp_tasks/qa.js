var module;

(function registerGulpTask(module){

	'use strict';

	var
		gulp 		= require('gulp'),
		jshint = require('gulp-jshint'),

		javaScriptFiles = ['./src/**/*.js', '!**/*-spec.js'];

	module.exports = {
		register: register
	};

	return;

	function register() {
		gulp.task('qa', run);
	}

	function run() {
		
		var packageJson = require('../package.json'),
			jshintConfig = packageJson

		gulp.src(javaScriptFiles)

			.pipe(jshint({lookup: true}))

			.pipe(jshint.reporter('default'));
	}

})(module);