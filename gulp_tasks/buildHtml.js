var module;

(function registerGulpTask(module){

	'use strict';

	var
		gulp 		= require('gulp'),
		htmlMinifier = require('gulp-html-minifier'),
		htmlReplace = require('gulp-html-replace'),
		
		javaScriptFiles = ['../src/**/*.js', '!**/*-spec.js'];

	module.exports = {
		register: register
	};

	return;

	function register() {
		gulp.task('buildHtml', ['buildJs'], run);
	}

	function run() {
		
		var options = {
			collapseWhitespace: true,
			ignorePath: '/web',
			removeComments: true
		};

		gulp.src('../src/**/*.html')

			.pipe(htmlReplace({
				'js': 'quiet-raccoon-training.min.js'
			}))

			.pipe(htmlMinifier(options))

			.pipe(gulp.dest('../dist'));
	}

})(module);