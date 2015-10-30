var module;

(function registerGulpTask(module){

	'use strict';

	var
		gulp 		= require('gulp'),

		util = require('gulp-util'),

		bump = require('gulp-bump');

	module.exports = {
		register: register
	};

	return;

	function register() {
		gulp.task('release-breaking', 		['build'], run.bind(null, 'major'));
		gulp.task('release-non-breaking', ['build'], run.bind(null, 'minor'));
		gulp.task('release-hotfix',				['build'], run.bind(null, 'patch'));
		gulp.task('release-dev', 					['build'], run.bind(null, 'prerelease'));
	}

	function run(type) {

		var options = {type: type};

		if(type === 'prerelease') {
			options.preid = 'alpha';
		}
		
		gulp.src(['./package.json', './bower.json'])
			.pipe(bump(options))
			.pipe(gulp.dest('./'));
	}

})(module);