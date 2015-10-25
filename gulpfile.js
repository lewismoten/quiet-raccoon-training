(function gulpFile(require, console){

	var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		jshint = require('gulp-jshint');

	gulp.task('default', function() {

		console.log('This is the default task...');

	});

	gulp.task('jshint', function(){

		gulp.src('lib/*.js')

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

			.pipe(jshint.reporter('default'))

	});

	gulp.task('compress', function() {

		gulp.src('lib/*.js')

			.pipe(uglify())

			.pipe(concat('quiet-raccoon-training.min.js'))
			
			.pipe(gulp.dest('dist'));

	});

})(require, console);