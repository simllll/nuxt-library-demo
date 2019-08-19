const path = require('path');
const externalDependencies = require('./package.json').dependencies;

module.exports = {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: `[name].js`,
		libraryTarget: 'commonjs2'
	},
	resolve: {
		symlinks: false,
		alias: {
			assets: path.resolve(__dirname, './assets'),
			'~assets': path.resolve(__dirname, './assets'),
			'~/assets': path.resolve(__dirname, './assets'),
			styles: path.resolve(__dirname, './src/styles'),
			'~styles': path.resolve(__dirname, './src/styles'),
			'~/styles': path.resolve(__dirname, './src/styles'),
			'~': path.resolve(__dirname, './src'),
			// '~~': path.resolve(__dirname, './'),
			'@': path.resolve(__dirname, './src'),
			'@@': path.resolve(__dirname, './')
		},
		extensions: ['.ts', '.js', '.vue', '.json']
	},
	performance: {
		hints: false
	},
	externals: [
		{
			vue: {
				commonjs: 'vue',
				commonjs2: 'vue',
				amd: 'vue',
				root: 'Vue'
			}
		},
		{
			'@hokify/shared-components': {
				commonjs: '@hokify/shared-components',
				commonjs2: '@hokify/shared-components',
				amd: 'hokifySharedComponents',
				root: '@hokify/shared-components'
			}
		},
		...Object.keys(externalDependencies),
		'moment',
		'axios',

	],
	devtool: 'source-map'
};
