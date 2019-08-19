/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const webpackConfig = require('./webpack.base')('client');

const babelOptions = {
	plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import']
};

const config = {
	...webpackConfig,
	target: 'web',
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
						loader: 'babel-loader',
						options: babelOptions
					},
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								target: 'es5'
							},
							appendTsSuffixTo: [/\.vue$/]
						}
					}
				],
				exclude: /node_modules|dist/
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: babelOptions
				},
				exclude: /node_modules|dist/
			},
			{
				test: /\.svg$/,
				oneOf: [
					{
						resourceQuery: /inline/,
						use: [
							{
								loader: 'babel-loader',
								options: babelOptions
							},
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
			'process.modern': false
		})
	]
};

module.exports = config;
