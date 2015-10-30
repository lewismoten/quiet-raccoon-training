var module;

(function registerGulpTask(module){

	'use strict';

	var
		gulp 		= require('gulp'),
		uglify 	= require('gulp-uglify'),
		concat 	= require('gulp-concat'),

		javaScriptFiles = ['./src/**/*.js', '!**/*-spec.js'];

	module.exports = {
		register: register
	};

	return;

	function register() {
		gulp.task('buildJs', run);
	}

	function run() {
		
		gulp.src(javaScriptFiles)

			.pipe(uglify())

			.pipe(concat('quiet-raccoon-training.min.js'))
			
			.pipe(gulp.dest('./dist'));
	}

})(module);