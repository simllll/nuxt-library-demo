import Fiber from 'fibers';
import Sass from 'sass';

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
	// plugins: ['plugins/hokifycv.js'],
	/*
	 ** Nuxt.js modules
	 */
	modules: [],
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
		extend(config, { isDev, isClient }) {
			// do not resolve symlinks
			if (isDev) config.resolve.symlinks = false
			console.log(' config.resolve.symlinks', isClient,  config.resolve.symlinks);
		}
	}
};
