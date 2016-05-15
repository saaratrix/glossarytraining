var gulp = require("gulp");
var del = require("del");

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('public/js/dist/**/*');
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function () {
    return gulp.src([
        "node_modules/es6-shim/es6-shim.js",
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        "node_modules/systemjs/dist/system-polyfills.js",
        'node_modules/rxjs/bundles/Rx.js',
        "node_modules/zone.js/dist/zone.js",
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/angular2/bundles/http.js',
        "node_modules/angular2/bundles/angular2-all.umd.dev.js"
    ])
    .pipe(gulp.dest('public/js/dist/lib'));
});
// Copy the html files to output
// Although this is completly unneccesary at the moment I thought it was neccesary but I just had an empty html file :)
// When relative template urls comes though then its probably good!
gulp.task("build:angular", function () {
    return gulp.src([
        "public/examapp/**/*.html"
    ])
    .pipe(gulp.dest('public/js/examapp'));
});

gulp.task('default', ['copy:libs', "build:angular"]);

