var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulp.config')();
var wiredep = require('wiredep').stream;
var angularFileSort = require('gulp-angular-filesort');

gulp.task('help', $.taskListing);

gulp.task('default', ['help']);

gulp.task('vet', function () {
    log('Vet js files in project...');

    return gulp
        .src(config.alljs)
        .pipe($.plumber())
        .pipe($.jscs())
        .pipe($.jshint())
        .on('error', errorLoger)
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('wiredep', function () {
    log('Wire up the bower css and js');
    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.css)))
        .pipe($.inject(gulp.src(config.js).pipe(angularFileSort())))
        .pipe(gulp.dest(config.public));
});

gulp.task('css', function () {
    log('Inject css');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.public));
});

gulp.task('lint', function () {

    return gulp.src(['resources/components/**/*.js'])
        .pipe($.eslint())
        .pipe($.eslint.format())
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

function errorLoger(error) {
    log('*** Start of Error ***');
    log(error);
    log('*** End of Error ***');
    this.emit('end');
}
