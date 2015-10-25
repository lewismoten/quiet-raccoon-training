(function gulpFile(require, console){

	var gulp = require('gulp'),
		minify = require('gulp-minify');

	gulp.task('default', function() {

		console.log('This is the default task...');

	});

	gulp.task('compress', function() {

		var options = {
			exclude: ['tasks'],
			ignoreFiles: ['.combo.js', '-min.js']
		};

		gulp.src('lib/*.js')

			.pipe(minify(options))

			.pipe(gulp.dest('dist'));

	});

})(require, console);