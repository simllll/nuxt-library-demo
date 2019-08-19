/* eslint-disable global-require, @typescript-eslint/no-var-requires */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const VUE_VERSION = require('vue/package.json').version;
const VUE_LOADER_VERSION = require('vue-loader/package.json').version;
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const webpackConfig = require('./webpack.config');

const CACHE_PATH = '.tmp/cache';

const extractCss = false; // false;

const PATHS = {
	src: path.join(__dirname, 'src')
};

const purgeCssConfig = {
	extractors: [
		{
			extractor: class {
				static extract(content) {
					return content.match(/[A-z0-9-:\\/]+/g) || [];
				}
			},
			extensions: ['html', 'vue', 'js']
		}
	]
};

const plugins = [new VueLoaderPlugin(), new WebpackCleanupPlugin({ quiet: true })];

if (extractCss) {
	plugins.push(
		new MiniCssExtractPlugin({
			filename: 'style.css'
		})
	);

	plugins.push(
		new PurgecssPlugin({
			paths: glob.sync(`${PATHS.src}/**/*.vue`), // ['./src/**/*.vue'],
			...purgeCssConfig
		})
	);
}

// do NOT activate this plugin, it is EVIL
// plugins.push(new HardSourceWebpackPlugin());

const config = dest => {
	let analyzerPort = 8880;
	// eslint-disable-next-line default-case
	switch (dest) {
		case 'server':
			analyzerPort++;
		// eslint-disable-next-line no-fallthrough
		case 'client':
			analyzerPort++;
		// eslint-disable-next-line no-fallthrough
		case 'modern':
			analyzerPort++;
	}
	/* plugins.push(
		new BundleAnalyzerPlugin({
			analyzerPort
		})
	); */

	return {
		...webpackConfig,
		output: {
			...webpackConfig.output,
			path: path.resolve(__dirname, `dist/${dest}/`),
			chunkFilename: `[name].${dest}.[hash:8].js`
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					options: {
						cacheDirectory: path.join(CACHE_PATH, 'vue-loader', dest),
						cacheIdentifier: [
							process.env.NODE_ENV || 'development',
							// webpack.version,
							VUE_VERSION,
							VUE_LOADER_VERSION
						].join('|')
					}
				},
				{
					test: /\.(css|scss|sass)$/,
					use: [
						extractCss ? MiniCssExtractPlugin.loader : 'vue-style-loader',
						{ loader: 'css-loader', options: { importLoaders: 1 } },
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: extractCss
									? [require('tailwindcss')(`${PATHS.src}/config/tailwind.js`)]
									: [
											require('tailwindcss')(`${PATHS.src}/config/tailwind.js`),
											require('@fullhuman/postcss-purgecss')({
												content: glob.sync(`${PATHS.src}/**/*.vue`), // ['./src/!**/!*.vue'],
												...purgeCssConfig
											}),
											require('cssnano')({
												preset: 'default'
											})
									  ]
							}
						},
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass')
							}
						}
					]
				},
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					options: {
						appendTsSuffixTo: [/\.vue$/]
					},
					// include: [path.resolve(__dirname, 'src/')],
					exclude: /node_modules/
				},
				{
					test: /\.(png|jpg|gif)$/,
					loader: 'file-loader',
					options: {
						name: '[name].[ext]?[hash:8]',
						publicPath: 'images',
						postTransformPublicPath: p => `__webpack_public_path__ + ${p}`,
						limit: Infinity
					},
					include: [path.resolve(__dirname, 'assets/images/')]
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'file-loader',
					options: {
						name: '[name].[ext]?[hash:8]',
						publicPath: 'fonts',
						postTransformPublicPath: p => `__webpack_public_path__ + ${p}`,
						limit: Infinity
					},
					include: [path.resolve(__dirname, 'assets/fonts/')]
				}
			]
		},
		plugins
	};
};

// console.log('nodeExternals', nodeExternals());
module.exports = config;
