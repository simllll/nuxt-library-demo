/* eslint-disable global-require, @typescript-eslint/no-var-requires */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const extractCSS = true;

const glob = require('glob')
const PATHS = {
	src: path.join(__dirname, 'src')
}

console.log('SRC', PATHS.src, glob.sync(`${PATHS.src}/**/*.vue`));

const plugins = [new VueLoaderPlugin()];
if (extractCSS)
	plugins.push(
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new PurgecssPlugin({
			paths: glob.sync(`${PATHS.src}/**/*.vue`)
		})
	);

exports.default = {
	mode: 'development',
	entry: {
		index: './src/index.ts'
	},
	// target: 'node', <-- must be web (default)
	optimization: {
		minimize: false
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		library: 'myComponents',
		libraryTarget: 'umd',
		libraryExport: 'default',
		// See https://github.com/webpack/webpack/issues/6522
		globalObject: "typeof self !== 'undefined' ? self : this",
		publicPath: '/dist/',
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS
					/*
					optimizeSSR: false,
					loaders: {
						js: {
							loader: 'babel-loader'
						}
					}*/
				}
			},
			/*{
				test: /\.[jt]s$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: [['@babel/env']]
					// cacheDirectory: true
				}
			},*/
			{
				test: /\.(scss|sass)$/,
				use: [
					extractCSS ? MiniCssExtractPlugin.loader : 'vue-style-loader',
					// 'vue-style-loader', // MiniCssExtractPlugin.loader, // ,
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [require('tailwindcss')('./src/myComponents/config/tailwind.js')]
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
				test: /\.css$/,
				use: [
					extractCSS ? MiniCssExtractPlugin.loader : 'vue-style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } }
				]
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/]
				},
				include: [path.resolve(__dirname, 'src/')],
				exclude: /node_modules/
			},
			// 		{
			// 			test: /\.js$/,
			// 			exclude: /node_modules/
			// 		},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'/': path.resolve(__dirname, './src/myComponents/static'),
			'~': path.resolve(__dirname, './src/myComponents'),
			// '~~': path.resolve(__dirname, './'),
			'@': path.resolve(__dirname, './src/myComponents'),
			'@@': path.resolve(__dirname, './'),
			assets: path.resolve(__dirname, './src/myComponents/assets'),
			'~assets': path.resolve(__dirname, './src/myComponents/assets'),
			'~/assets': path.resolve(__dirname, './src/myComponents/assets'),
			static: path.resolve(__dirname, './src/myComponents/static')
		},
		extensions: ['.ts', '.js', '.vue', '.json']
	},
	performance: {
		hints: false
	},
	externals: {
		vue: {
			commonjs: 'vue',
			commonjs2: 'vue',
			amd: 'vue',
			root: 'Vue'
		},
		...nodeExternals()
	},
	// devtool: 'inline-cheap-module-source-map',
	devtool: 'source-map',
	plugins
};
