const { src, dest, series, parallel, task } = require('gulp');
const rename = require('gulp-rename');
const del = require('del');
const { runWebpack } = require('../../gulpHelper');

task('build:lib:client', function() {
	return runWebpack('client', require('./webpack.lib.client.config'));
});

task('build:lib:modern', function() {
	if (!process.env.NODE_ENV) {
		console.info('skipping modern build on dev env');
		return Promise.resolve();
	}

	return runWebpack('modern', require('./webpack.lib.modern.config'));
});

task('build:lib:server', function() {
	return runWebpack('server', require('./webpack.lib.server.config'));
});

task('build:module', function() {
	return runWebpack('module', require('./webpack.module.config'));
});

task('copyEntryFile', function() {
	return src('./src/loader.js')
		.pipe(rename('./index.js'))
		.pipe(dest('dist/', { overwrite: true }));
});

const build = series(
	parallel('build:lib:client', 'build:lib:server', 'build:lib:modern', 'build:module'),
	'copyEntryFile'
);

exports.build = build;

function clean() {
	return del(['./dist']);
}

exports.clean = clean;
