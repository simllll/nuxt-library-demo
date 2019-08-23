/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpackConfig = require('./webpack.base')('client');

// const x = require('@nuxt/babel-preset-app');

const babelOptions = {
	presets: [['@nuxt/babel-preset-app', { buildTarget: 'client', modern: false }]],
	plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import']
};

// const babelOptions = x({ buildTarget: 'client', modern: false, modules: 'commonjs' });

/* {
	presets: [['@nuxt/babel-preset-app', { buildTarget: 'client', modern: false, modules: 'commonjs' }]],
	// presets: [['@babel/preset-env', { useBuiltIns: 'entry', corejs: 2 }]],
	plugins: [
		'@babel/plugin-proposal-object-rest-spread',
		'lodash'
		/*	[
			'@babel/plugin-transform-runtime',
			{
				regenerator: false,
				corejs: 2,
				helpers: true,
				useESModules: true
			}
		]
	]
}; */

const config = {
	...webpackConfig,
	target: 'web',
	output: {
		...webpackConfig.output,
		libraryTarget: 'umd',
		library: 'testSharedLib'
	},
	// libraryTarget: 'commonjs2'
	// libraryExport: 'default',
	// See https://github.com/webpack/webpack/issues/6522
	// globalObject: "typeof self !== 'undefined' ? self : this",
	// },
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
								// target: 'es5'
								target: 'esnext' // babel transform to es5
							},
							appendTsSuffixTo: [/\.vue$/]
						}
					}
				],
				// include: [path.resolve(__dirname, 'src/')],
				exclude: /node_modules|dist/
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: babelOptions
				},
				exclude: /node_modules|dist/
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
			'process.modern': false
		}),
		new LodashModuleReplacementPlugin()
	]
};

// console.log('config', config.module.rules);

module.exports = config;
