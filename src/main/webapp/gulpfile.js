/*eslint no-undef: "error"*/
/*eslint-env node*/
/*eslint angular/typecheck-object: 0*/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulp.config')();
var wiredep = require('wiredep').stream;
var angularFileSort = require('gulp-angular-filesort');

gulp.task('help', $.taskListing);

gulp.task('default', ['help'], function () {
    log('**************************************************');
    log('**************GULP TASK DESCRIPOTION**************');
    log('**************************************************');
    log('***** wiredep - wire all bower js and css    *****');
    log('***** css - inject custom css                *****');
    log('***** lint - check js code for errors        *****');
    log('**************************************************');
});

gulp.task('wiredep', ['css'], function () {
    log('Wire up the bower css and js...');
    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js).pipe(angularFileSort())))
        .pipe(gulp.dest(config.public));
});

gulp.task('css', function () {
    log('Inject custom css...');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.public));
});

gulp.task('lint', function () {
    log('Linting js code...');

    return gulp.src(['resources/components/**/*.js'])
        .pipe($.eslint())
        .pipe($.eslint.format('table'))
        .pipe($.eslint.failAfterError());
});


///////////////////////////////////////////////////////////////////////////////


function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.green(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.green(msg));
    }
}

