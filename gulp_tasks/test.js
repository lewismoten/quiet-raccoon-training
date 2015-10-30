var module;

(function registerGulpTask(module){

	'use strict';

	var
		gulp 		= require('gulp'),
		jasmine = require('gulp-jasmine');

	module.exports = {
		register: register
	};

	return;

	function register() {
		gulp.task('test', run);
	}

	function run() {
		
		return gulp.src('**/*-spec.js')
			.pipe(jasmine());

	}

})(module);