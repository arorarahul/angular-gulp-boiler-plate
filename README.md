# Angular gulp boiler plate with modularized design pattern

A boiler plate following modularized design pattern for Angular 1.x. Gulp is used to build the code and run it.
This boiler plate also used browser-sync so that refreshing the browser on changing static content is not required.

## Steps to use the boiler plate

```javascript
//git clone
git clone https://github.com/arorarahul/angular-gulp-boiler-plate.git

//move to the project directory
cd angular-gulp-boiler-plate

//npm install to install all the third party modules used
npm install

//run gulp to see the output
gulp
```

## Third party modules used

* [AngularJS](https://www.npmjs.com/package/angular) for frontend development JS
* [Bootstrap](https://www.npmjs.com/package/bootstrap) to manage the CSS for frontend development
* [Gulp](http://gulpjs.com/) and related gulp dependencies to build the code and run it
* [Angular ui router](https://github.com/angular-ui/ui-router) to manage the frontend routing

## JS Style Guide

* Each and every javascript file is wrapped inside and IIFE with a semi-colon in the beginning.

```javascript
;(function(){
	
})();
```
This will keep your code safe and away from namespace errors. Introducing a semi-colon in the beginning ensures addition of semi-colon if missed in some other file when merged while building using tools like gulp etc. 

* Use of strict mode is very important

* AngularJS functions/controllers used the given design pattern:
```javascript
angular.module("myApp.home.controllers")
	.controller("HomeController",['$scope',function($scope){

		console.log("This is the home controller");

	}])
```

Each dependency is first listed in an array and then passed to the callback function in the same order.
This is because when the code is 'uglified' using gulp, strings are not uglified which gives a reference to AngularJS that '$scope' is referred to as 'a' etc.

* Absolute URLs are used throughout the project

## Modularized design pattern - Naming convention

* The main module is referred to as 'myApp'. It can be anything based on your requirements

```javascript
    var app = angular.module("myApp", [

		//third party modules
		'ui.router',

		//in built module dependencies
		'myApp.shared',
		'myApp.home'

	]);
```
* The modules which are a dependency are written as 'myApp.<sub_module_name>. This chain will be followed as the nesting grows as done in index.js present in the controllers folder

For eg:
```javascript
;(function(){

	"use strict";

	angular.module("myApp.home",[

		//controllers
		'myApp.home.controllers'

		//services and directives can be a different module and listed here as dependency

	])

})();
```

* Controllers are named as Capitalized with full name of the controller. For eg. for 'header', the controller name is 'HeaderController'

```javascript
;(function(){

	"use strict";

	angular.module("myApp.home.controllers")
	.controller("HomeController",['$scope',function($scope){

		console.log("This is the home controller");

	}])
	

})();
```

* Views/ templates are named as <module-name>-partial.html. For eg. for 'header' it is 'header-partial.html'


## Modularized design pattern - Scalability

* This pattern is highly scalable as every thing is divided into modules and can be reused.
* Each module has its own folder. In this case, 'shared', 'home'. More modules can be added as the application scales up
* Each module will have further sub-folders as 'controllers','services','directives' depending on what is required in the module
* Each controller, directive or service can further have their own module defined.
* Each folder has 'index.js' where the module is defined for that folder

## Using gulp - Explanation

Gulp file is divided into four parts as explained below:

* First part contains all the modules to be required.

```javascript
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps');
```

* Second part contains all the gulp tasks such as 'script','html','css' etc.

```javascript
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
```

* Third part contains all the watchers (if any) used in the gulpfile. These watchers will keep an eye on the files passed and will fire the tasks given any changes in those file occur.

```javascript
gulp.task('watch', function(){
	gulp.watch(['static/*.js','static/app/**/*.js', '!static/app/*.min.js'], ['scripts']);
	gulp.watch(['!*.html'], ['html']);
	gulp.watch(['static/assets/css/*.css'], ['css']);
});
```

* Fourth part (which is optional) can contain the default task which will run the tasks passed when 'gulp' command is run on the command-line interface

## Live reloading

The live reloading is made possible using [browser-sync](https://www.npmjs.com/package/browser-sync)
Gulp helps to fire the browser-sync tasks whenever the mentioned files are changes. This helps in live reloading

## Contributing

Anyone can contribute to make this even better!

Eg. Test cases, Backend code integration architecture and more good practices etc.
