

                                                                       /*`  
                                                                     ::::::,
                                                                   :::::::::
                                                                 ,::::::::. 
                                                               .::::::::,   
                                                             `:::::::::     
                                                            :::::::::       
                                                          :::::::::         
                                                        :::::::::           
                                                      :::::::::             
                                                    :::::::::               
                                                   ::::::::`                
                                                  :::::::.                  
                                                  :::::::                   
                                                 :::::::`                   
                                                 :::::::                    
                                                :::::::.                    
                                                :::::::                     
                                               :::::::.                     
             `.,:::::::::::::::::::::::::::::::::::::::::::::,`             
   `:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::`  
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  `:::::::::::::::::::::::::::::::::::::::::: `,,,,` ,::::::::::::::::::::  
 ::`       `,:::::::::::::::::::::::::::::::::::::::::::::::::::.`       .::
 ::::::::::::,.`                                             `.:::::::::::::
 ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.
 `::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::, 
  ,:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::` 
   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  
   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  
   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  
   ::::::::::::::::    .:::::::::::::::::::::::::::::::::::::::::::::::::.  
   .:::::::::::.          ,::::::::::::::::::::::::::::::::::::::::::::::   
    :::::::::     `::::.    :::::::::::::::::::::::    ::::::::::::::::::   
    :::::::,    .::::::::   ::::::::::::::::::::::,   :::::::::::::::::::   
    ::::::     :::::::::::::::::::::::::::::::::::   ::::::::::::::::::::   
    :::::    .:::::::::::::::::::::::::::::::::::   .:::::::::::::::::::`   
    `:::    ::::::::::::::::::::::::::::::::::::   `::::::::::::::::::::    
     ::    ::::::::::,   ::::::::::::::::::::::`   :::::::::::::::::::::    
     :    ,::::::::::   `:::::   ::::::  .::::,   :::::::.::::.    `::::    
     `    ::::::::::    :::::   `:::::   :::::   :::::::   :        .::,    
         ::::::::::`   :::::   `:::::   `::::   ,::::::      ::::   :::     
         :::::::::    `::::   `:::::    ::::   `::::::`    ::::    ::::     
        ,:::::::      ::::,   :::::    ::::.   :::::      :::,   ::::       
        `:::::       :::::   ,:::.    ,::::   ::::      ,:::   `::,         
          `     :,   ::::,         :  `,           `   .:::   ,:    `:`     
             `:::   ::::::       :::     .:      ::   `:::,       ::::      
      `:::::::::`  `::::::::::::::::::::::::::::::    ::::::::::::::::      
       :::::::::   ::::::::::::::::::::::::::::::    :::::::::::::::::      
       :::::::::  ::::::::::::::::::::::::::::::    :::::::::::::::::,      
       ::::::::::::::::::::::::::::::::::::::::.   ,:::::::::::::::::       
       ::::::::::::::::::::::::::::::::::::::::    ::::::::::::::::::       
       .:::::::::::::::::::::::::::::::::::::::,`::::::::::::::::::::       
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::,       
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::`       
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::        
        ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::        
        .:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::        
         ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.        
         ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::         
         `::::::::::::::::::::::::::::::::::::::::::::::::::::::::`         
              `::::::::::::::::::::::::::::::::::::::::::::::`              
            :::.        .::::::::::::::::::::::::::,`       .:::`           
             ::::::::::::,.`                    `.,::::::::::::             
              ::::::::::::::::::::::::::::::::::::::::::::::::              
               ::::::::::::::::::::::::::::::::::::::::::::::               
                ::::::::::::::::::::::::::::::::::::::::::::,               
                ::::::::::::::::::::::::::::::::::::::::::::.               
                ::::::::::::::::::::::::::::::::::::::::::::`               
                ::::::::::::::::::::::::::::::::::::::::::::                
                ::::::::::::::::::::::::::::::::::::::::::::                
                .:::::::::::::::::::::::::::::::::::::::::::                
                 :::::::::::::::::::::::::::::::::::::::::::                
                 :::::::::::::::::::::::::::::::::::::::::::                
                 :::::::::::::::::::::::::::::::::::::::::::                
                 ::::::::::::::::::::::::::::::::::::::::::,                
                 ::::::::::::::::::::::::::::::::::::::::::.                
                 ,:::::::::::::::::::::::::::::::::::::::::                 
                 .:::::::::::::::::::::::::::::::::::::::::                 
                  :::::::::::::::::::::::::::::::::::::::::                 
                     ,:::::::::::::::::::::::::::::::::.                    
                              `.,:::;;;;;:::,.`*/



(function gulpFile(require, console){

	'use strict';

	var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		jshint = require('gulp-jshint'),
		webserver = require('gulp-webserver'),
		htmlMinifier = require('gulp-html-minifier'),
		htmlReplace = require('gulp-html-replace'),
		bump = require('gulp-bump'),
		git = require('gulp-git'),
		filter = require('gulp-filter'),
		tagVersion = require('gulp-tag-version'),
		jasmine = require('gulp-jasmine'),

		javaScriptFiles = ['./src/**/*.js', '!**/*-spec.js'];

	registerTasks(gulp);

	return;

	function registerTasks() {

		gulp.task('default', defaultTask);
		gulp.task('host', runWebServer);

		gulp.task('qa', checkCodeQuality);
		gulp.task('test', runUnitTests);

		gulp.task('build', ['qa', 'buildJs', 'buildHtml', 'test'], build);
		gulp.task('buildJs', compressJavaScript);
		gulp.task('buildHtml', ['buildJs'], compressHtml);

		gulp.task('patch', ['build'], bumpVersion.bind(null, 'patch'));
		gulp.task('feature', ['build'], bumpVersion.bind(null, 'minor'));
		gulp.task('alpha', ['build'], bumpVersion.bind(null, 'prerelease'));
		gulp.task('release', ['build'], bumpVersion.bind(null, 'major'));

	}

	function runUnitTests() {
		return gulp.src('**/*-spec.js')
			.pipe(jasmine());
	}

	function bumpVersion(type) {
		var options = {type: type};

		if(type === 'prerelease') {
			options.preid = 'alpha';
		}

		gulp.src(['./package.json', './bower.json'])
			.pipe(bump(options))
			.pipe(gulp.dest('./'))
			// TODO: Update version in README.md
			// TODO: create change log ( filtering specific commits? )
			.pipe(git.commit('bumps version for ' + type, {args: '--quiet'}))
			.pipe(filter('package.json'))
			.pipe(tagVersion());
	}

 	function defaultTask() {

		console.log('\nAvailable tasks:\n');

		Object.keys(gulp.tasks).map(displayTask);

		console.log();
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

			.pipe(htmlReplace({
				'js': 'quiet-raccoon-training.min.js'
			}))

			.pipe(htmlMinifier(options))

			.pipe(gulp.dest('./dist'));
	}

	function compressJavaScript() {

		gulp.src(javaScriptFiles)

			.pipe(uglify())

			.pipe(concat('quiet-raccoon-training.min.js'))
			
			.pipe(gulp.dest('./dist'));
	}

	function checkCodeQuality(){

		var packageJson = require('./package'),
			jshintConfig = packageJson

		gulp.src(javaScriptFiles)

			.pipe(jshint({lookup: true}))

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