(function gulpFile(require, console){

	'use strict';

	var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		jshint = require('gulp-jshint'),
		webserver = require('gulp-webserver'),
		htmlmin = require('gulp-html-minifier'),
		htmlreplace = require('gulp-html-replace');

	registerTasks(gulp);

	return;

	function registerTasks() {

		gulp.task('default', defaultTask);
		gulp.task('host', runWebServer);
		gulp.task('qa', checkCodeQuality);
		gulp.task('build', ['buildJs', 'buildHtml'], build);
		gulp.task('buildJs', compressJavaScript);
		gulp.task('buildHtml', ['buildJs'], compressHtml);

	}

 	function defaultTask() {

		console.log('\nAvailable tasks:\n');

		Object.keys(gulp.tasks).map(displayTask);

		console.log();
	}

	function registerTask(task, index) {
		gulp.task.apply(gulp, task);
	}

	function build() {

	}

	function displayTask(name, index) {
		console.log('\t%s. %s', index + 1, name);
	}

	function compressHtml() {

		var options = {
			collapseWhitespace: true,
			ignorePath: '/web',
			removeComments: true
		};

		gulp.src('./src/**/*.html')

			.pipe(htmlreplace({
				'js': 'quiet-raccoon-training.min.js'
			}))

			.pipe(htmlmin(options))

			.pipe(gulp.dest('./dist'));
	}

	function compressJavaScript() {

		gulp.src('./src/**/*.js')

			.pipe(uglify())

			.pipe(concat('quiet-raccoon-training.min.js'))
			
			.pipe(gulp.dest('./dist'));
	}

	function checkCodeQuality(){

		gulp.src('./src/**/*.js')

			.pipe(jshint({
				"eqnull": true,
				"curly": true,
				"eqeqeq": true,
				"es3": true,
				"forin": true,
				"freeze": true,
				"futurehostile": true,
				"latedef": true,
				"maxcomplexity": 20,
				"maxdepth": 5,
				"maxerr": 20,
				"maxparams": 7,
				"maxstatements": 10,
				"noarg": true,
				"nocomma": true,
				"nonbsp": true,
				"nonew": true,
				"shadow": true,
				"singleGroups": true,
				"strict": true,
				"undef": true,
				"unused": true,
				"predef": [
					"console"
				]
			}))

			.pipe(jshint.reporter('default'));

	}

	function runWebServer() {

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


})(require, console);