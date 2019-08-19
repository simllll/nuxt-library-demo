# nuxt library demo

this repo is demonstrates how you can build your own library to use for nuxt. (it's a monorepo with a nuxt app and nuxt library in it)

I'm using:
* webpack to build a library that can be rendered on server and on client
* tailwind to demonstrate how you can extend your library
* custom assets to export via module
* optimized server side rendering even for stylesheets

See also https://cmty.app/nuxt/nuxt.js/issues/c9554

# some notes
### package.json sideEffects
 if you set sideEffecs to false, css gets removed. Therefore I added "sideEffects": [
                                                                     		"*.css",
                                                                     		"*.scss",
                                                                     		"*.vue"
                                                                     	]

### gulp
I'm using gulp to build 3 + 1 module in parallel. I build a modern version, a client version (es5) and a ssr/server version. Futhermore a nuxt module
is built to register assets that your library is using.

### the nuxt module
the module is actually a "trick" to automatically register all assets this library exposes. If you do not use nuxt and would like to use a library that has
more assets and they are not packed within webpack than you woudl have to deal with it by yourself. The module approach solve this for you in background.

I added two subfoldesr in assets "images" (for png,jpg,svg,etc) and fonts (woff2,svg,..etc) to demonstrate this. the fonts directory is empty though, play around with it ;)
 
### demo
there is a demo file included, you can run the library with it by itself. type "npm run dev-lib" to start it. 

### async components
all components are async exported, check out the componets/index.ts file.
This is the syntax for async components export: "() => import(...);" which allows webpack to split up the bundle in more smaller chunks.

### webpack and monorepo.
very important when using a monorepo like this one here, ensure that webpack resolve.symlinks is false.

### vue and monoprepo.
beware that a monorepo can install vue in a a lot of different locations (there are more than one node_modules directories). therefore it is 
super important to hoist your dependencies (which means all node_modules are installed in the root).
e.g. if you see something like  Property or method "_ssrNode" is not defined on the instance but referenced during render.  , you probably
have multiple instances of vue lying around.

### using this components within nuxt:
* add your component as module (nuxt.config.js)
```js
modules: [
		// load components library as module
		path.join(path.dirname(require.resolve('test-component-lib')), '/module')
	]
```
* add your componetn as plugin (i know the module could registe a plugin too, I welcome any PR on this ;))
```js
plugins: [
		// load components library as plugin
		'~/plugins/my-component-library'
	],
```
* create the plugin, e.g.:
~/plugins/my-component-library
```js
import Vue from 'vue';
import SharedComponentsPlugin from 'test-component-lib';

export default ctx => {
    const { app } = ctx;
    Vue.use(SharedComponentsPlugin, {
        publicPath: process.env.publicPath,
        moment: ctx.$moment
    });
};
```
  
* use the component like you would do normally:
```vue
<template>
    <Test>hallo2</Test>
</template>

<script>
import { Test } from 'test-component-lib';

export default {
  components: {
    Test
  }
}
</script>
```

## get started
to install needed dependencies
* npm install && npm run bootstrap

### build library
npm run build-lib

### start nuxt dev server
npm run dev



