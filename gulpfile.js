/*
Requiring all the modules required for gulp
*/
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps');


var config = {
	customScript: ['static/app.js','static/app/*/index.js','static/app/*/*/index.js','static/app/**/*.js','!static/*.min.js','!static/app/**/*.min.js'],
	thirdPartyScript: [
		'node_modules/angular/angular.min.js', 
	 	'!node_modules/angular/*.min.min.js',
	 	'node_modules/angular-ui-router/release/angular-ui-router.min.js', 
	]
};

//task to delete the existing js files (if any) made by gulp
gulp.task('clean', function(){

	del([
		'static/script.min.js',
	])
	del([
		'static/lib.min.js',
	])

});

/*
Scripts Tasks
*/
gulp.task('scripts', function(){
	gulp.src(config.customScript)
	    .pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('script.min.js'))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('static'))
		.pipe(reload({stream: true}));

	gulp.src(config.thirdPartyScript)
		.pipe(plumber())
		.pipe(concat('lib.min.js'))
		.pipe(gulp.dest('static'))
		.pipe(reload({stream: true}));
})

/*
HTML Tasks
*/
gulp.task('html', function(){
	gulp.src(['*.html','templates/*/*.html'])
	.pipe(reload({stream: true}));
		
})

/*
CSS Tasks
*/
gulp.task('css', function(){
	gulp.src('static/assets/css/*.css')
	.pipe(reload({stream: true}));
		
})


/*
Browser Tasks
*/
gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: ""
		}
	});
});


/*
Watch Tasks
*/
gulp.task('watch', function(){
	gulp.watch(['static/*.js','static/app/**/*.js', '!static/app/*.min.js'], ['scripts']);
	gulp.watch(['!*.html'], ['html']);
	gulp.watch(['static/assets/css/*.css'], ['css']);
});


/*
Default Taks
*/
gulp.task('default',['scripts','html','css','browser-sync','watch']); 