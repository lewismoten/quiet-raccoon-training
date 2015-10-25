(function gulpFile(require, console){

	var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat');

	gulp.task('default', function() {

		console.log('This is the default task...');

	});

	gulp.task('compress', function() {

		var options = {
			exclude: ['tasks'],
			ignoreFiles: ['.combo.js', '-min.js']
		};

		gulp.src('lib/*.js')

			.pipe(uglify())

			.pipe(concat('quiet-raccoon-training.min.js'))
			
			.pipe(gulp.dest('dist'));

	});

})(require, console);