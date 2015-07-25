/* jshint ignore:start */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var ts = require('gulp-typescript');
var jade = require('gulp-jade');
var runSequence = require('run-sequence').use(gulp);
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require( 'gulp-develop-server' );
var browserify = require('gulp-browserify');
var Server = require('karma').Server;
var rename = require('gulp-rename');
var notifier = require('node-notifier');
var concat = require('gulp-concat');
var dev = false;
var config = {
	dist: './dist',
	client: {
    assets: ['./client/assets/**/*'],
		ts: ['./client/ts/**/*.ts', './typings/**/*.ts'],
		scss: ['./client/scss/**/*.scss'],
		jade: ['./client/jade/**/*.jade'],
		dist: './dist/',
		tests: './client/**/__tests__/*.ts'
	}
};

gulp.task('serve', ['sass'], function () {
	browserSync.init({
    port: 9000,
		server: config.client.dist
	});
  gulp.watch(config.client.assets, ['copy-assets']);
	gulp.watch(config.client.scss, ['sass']);
  gulp.watch(config.client.ts, ['typescript']);
	gulp.watch(config.client.jade, ['templates'] );
});

gulp.task('sass', function () {
	return gulp.src(config.client.scss)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer({browsers: ['last 1 version']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.client.dist + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('templates', function () {
	gulp.src(config.client.jade)
  .pipe(jade({pretty: dev}))
  .pipe(gulp.dest(config.client.dist))
  .pipe(browserSync.stream());
});

var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
gulp.task('gen-tests', function() {
	console.log('using', config.client.tests)
	return gulp.src(config.client.tests)
		.pipe(ts(tsProject))
		.js
		.pipe(browserify({
			insertGlobals : true,
			// debug : true
		}))
		.pipe(rename('test.js'))
		.pipe(gulp.dest('./test/'))
})
gulp.task('karma', function(done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function(exitCode) {
		console.log('karma exited with code', exitCode)
		if(!exitCode){
			notifier.notify({
				sound: true,
				'title': 'Unit Tests Failing',
				'message': 'Do it again'
			});
		}
		done();
	}).start();
});
gulp.task('test', function() {
	return runSequence('gen-tests', 'karma');
})

gulp.task('typescript', function () {
	var tsResult = gulp.src(config.client.ts)
  .pipe(sourcemaps.init())
	.pipe(ts(tsProject))
	return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.client.dist + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('clean', function () {
	return gulp.src(config.dist).pipe(clean());
});

gulp.task('dev', function (cb) {
	dev = true;
	runSequence('default', cb);
});

gulp.task('copy-assets', function() {
  return gulp.src(config.client.assets).
        pipe(gulp.dest(config.client.dist + 'assests'))
        .pipe(browserSync.stream());
})

gulp.task('default', function (cb) {
	runSequence('clean', ['copy-assets', 'templates', 'typescript', 'sass'], ['serve'], cb);
});
