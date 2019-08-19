const path = require('path');
/* eslint-disable @typescript-eslint/no-var-requires */
const webpackClientConfig = require('./webpack.lib.client.config');

process.client = true;

const config = {
	...webpackClientConfig,
	mode: 'development',
	node: {
		// set this to false, we wanna use the dirname of the parent app
		__dirname: false,
		__filename: false
	},
	entry: {
		demo: './demo/main.js'
	},
	output: {
		// publicPath: '_assets',
		path: path.resolve(__dirname, 'demo/'),
		filename: 'demo.js'
	},
	externals: {},
	devServer: {
		clientLogLevel: 'trace',
		contentBase: [path.join(__dirname, 'demo'), path.join(__dirname, 'dist')],
		compress: true,
		port: 9000
	}
};

// console.log('config', config);

module.exports = config;
