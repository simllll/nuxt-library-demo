import Fiber from 'fibers';
import Sass from 'sass';
import * as path from 'path';

const customSass = {
	implementation: Sass,
	fiber: Fiber
};

export default {
	mode: 'universal',
	/*
	 ** Headers of the page
	 */
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || ''
			}
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#fff' },
	/*
	 ** Global CSS
	 */
	css: [],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		// load components library as plugin
		'~/plugins/my-component-library'
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// load components library as module
		path.join(path.dirname(require.resolve('test-component-lib')), '/module')
	],
	/*
	 ** Build configuration
	 */
	build: {
		loaders: {
			scss: customSass
		},
		// transpile: [/hokifycv-component/],
		/*
		 ** You can extend webpack config here
		 */
		// extend webpack config
		extend(config, { isDev }) {
			// do not resolve symlinks
			if (isDev) config.resolve.symlinks = false
		}
	}
};
