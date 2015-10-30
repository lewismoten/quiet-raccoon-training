var module;

(function registerGulpTask(module){

	'use strict';

	var gulp 		= require('gulp');

	module.exports = {
		register: register
	};

	return;

	function register() {
		gulp.task('build', ['qa', 'buildJs', 'buildHtml', 'test'], run);
	}

	function run() {
	
	}

})(module);