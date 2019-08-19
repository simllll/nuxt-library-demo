/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const webpackConfig = require('./webpack.base')('server');
const nodeExternals = require('webpack-node-externals');

const config = {
	...webpackConfig,
	target: 'node',
	entry: {
		index: './src/index.ts',
		module: './src/module.ts'
	},
	plugins: [
		...webpackConfig.plugins,
		new webpack.DefinePlugin({
			'process.server': true,
			'process.client': false,
			'process.modern': false
		})
	],
	externals: [...webpackConfig.externals, nodeExternals()],
	module: {
		...webpackConfig.module,
		rules: [
			...webpackConfig.module.rules,
			{
				test: /\.svg$/,
				oneOf: [
					{
						resourceQuery: /inline/,
						use: [
							{
								loader: 'vue-svg-loader',
								options: {
									svgo: false
								}
							}
						]
					},
					{
						resourceQuery: /data/,
						loader: 'url-loader'
					},
					{
						loader: 'file-loader' // By default, always use file-loader
					}
				]
			}
		]
	}
};

module.exports = config;
