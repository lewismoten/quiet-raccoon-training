var module;

(function registerGulpTask(module){

	'use strict';

	var
		gulp 	= require('gulp'),
		zip 	= require('gulp-zip');

	module.exports = {
		register: register
	};

	return;

	function register() {
		gulp.task('zip', run);
	}

	function run() {
		gulp.src('node_modules/**/*')
			.pipe(zip('node_modules.zip'))
			.pipe(gulp.dest('./'));
	}

})(module);