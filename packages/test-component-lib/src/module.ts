import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

export default function() {
	this.options.build.plugins.push({
		apply(compiler) {
			compiler.plugin('emit', function module(compilation, cb) {
				const assetsRoot = path.resolve(__dirname, '../assets');

				/**
				 * register all image assets
				 */
				const imageAssets = glob.sync(path.join(assetsRoot, './images/**/*.*'));
				imageAssets.forEach(assetPath => {
					compilation.assets[`my-custom-components/images/${path.basename(assetPath)}`] = {
						source: () => fs.readFileSync(assetPath),
						size: () => fs.statSync(assetPath).size
					};
				});

				/**
				 * register all svg assets
				 */
				const svgAssets = glob.sync(path.join(assetsRoot, './svgs/**/*.*'));
				svgAssets.forEach(assetPath => {
					compilation.assets[`my-custom-components/svgs/${path.basename(assetPath)}`] = {
						source: () => fs.readFileSync(assetPath),
						size: () => fs.statSync(assetPath).size
					};
				});

				/**
				 * register all font assets
				 */
				const fontAssets = glob.sync(path.join(assetsRoot, './fonts/**/*.*'));
				fontAssets.forEach(assetPath => {
					compilation.assets[`my-custom-components/fonts/${path.basename(assetPath)}`] = {
						source: () => fs.readFileSync(assetPath),
						size: () => fs.statSync(assetPath).size
					};
				});

				/**
				 * register all chunks (client)
				 */
				const clientAssets = glob.sync(path.join(assetsRoot, '../dist/client/*.*'));

				clientAssets.forEach(assetPath => {
					compilation.assets[`my-custom-components/${path.basename(assetPath)}`] = {
						source: () => fs.readFileSync(assetPath),
						size: () => fs.statSync(assetPath).size
					};
				});

				/**
				 * register all chunks (modern)
				 */
				const modernAssets = glob.sync(path.join(assetsRoot, '../dist/modern/*.*'));

				modernAssets.forEach(assetPath => {
					compilation.assets[`my-custom-components/${path.basename(assetPath)}`] = {
						source: () => fs.readFileSync(assetPath),
						size: () => fs.statSync(assetPath).size
					};
				});

				cb();
			});
		}
	});
}
