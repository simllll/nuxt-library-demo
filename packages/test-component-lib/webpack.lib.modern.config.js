/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const webpackConfig = require('./webpack.base')('modern');

const config = {
	...webpackConfig,
	output: {
		...webpackConfig.output,
		libraryTarget: 'umd',
		library: 'hokifyCvComponents'
	},
	module: {
		...webpackConfig.module,
		rules: [
			...webpackConfig.module.rules.filter(rule => rule.test.toString() !== /\.tsx?$/.toString()),
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								target: 'es2017'
							},
							appendTsSuffixTo: [/\.vue$/]
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				exclude: /node_modules/
			},
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
	},
	entry: {
		index: './src/index.ts'
	},
	plugins: [
		...webpackConfig.plugins,
		new webpack.DefinePlugin({
			'process.server': false,
			'process.client': true,
			'process.modern': true
		})
	]
};

module.exports = config;
