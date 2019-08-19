/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
	mode: 'production',
	target: 'node',
	node: {
		// set this to false, we wanna use the dirname of the parent app
		__dirname: false,
		__filename: false
	},
	output: {
		path: path.resolve(__dirname, `dist/`),
		filename: `[name].js`,
		libraryTarget: 'commonjs2'
	},
	entry: {
		module: './src/module.ts'
	},
	plugins: [],
	externals: [nodeExternals()]
};

// console.log('config', config);

module.exports = config;
