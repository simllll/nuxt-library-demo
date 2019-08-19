const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const gutil = require("gulp-util");

const runWebpack = async (name, webpackConfig) => {
	let color;
	switch (name) {
		case 'server':
			color = 'blue';
			break;
		case 'modern':
			color = 'yellow';
			break;
		default:
			color = 'green';
	}

	return new Promise((resolve, reject) => {
		webpack(
			{
				...webpackConfig,
				plugins: [
					...webpackConfig.plugins,
					new WebpackBar({ name, color })
				]
			},
			(err, stats) => {
				if(err) {
					reject(new gutil.PluginError("webpack", err));
					return;
				}
				gutil.log("[webpack]", stats.toString({
					colors: true
				}));

				if (stats.hasErrors()) {
					reject(new Error('build failed'));
				} else {
					resolve();
				}
			}
		);
	});
};

exports.runWebpack = runWebpack;
