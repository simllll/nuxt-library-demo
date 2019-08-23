/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpackConfig = require('./webpack.base')('modern');

const babelOptions = {
	presets: [['@nuxt/babel-preset-app', { buildTarget: 'client', modern: true }]],
	plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import']
};

const config = {
	...webpackConfig,
	output: {
		...webpackConfig.output,
		libraryTarget: 'umd',
		library: 'testSharedLib'
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
								target: 'esnext' // babel transform to "modern" / es7
							},
							appendTsSuffixTo: [/\.vue$/]
						}
					}
				],
				// include: [path.resolve(__dirname, 'src/')],
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions
				}
				// query: {
				// presets: [['@babel/env']]
				// cacheDirectory: true
				// }
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
								/* options: {
									presets: ["@babel/preset-env"],
									plugins: ["@babel/plugin-proposal-object-rest-spread"]
								} */
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
			'process.modern': true
		}),
		new LodashModuleReplacementPlugin()
	]
};

// console.log('config', config.module.rules);

module.exports = config;
