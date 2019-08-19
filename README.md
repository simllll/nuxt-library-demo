# nuxt library demo

this repo is demonstrates how you can build your own library to use for nuxt. (it's a monorepo with a nuxt app and nuxt library in it)

I'm using:
* webpack to build a library that can be rendered on server and on client
* tailwind to demonstrate how you can extend your library
* custom assets to export via module
* opitmized server side rendering even for stylesheets
* ...

See also https://cmty.app/nuxt/nuxt.js/issues/c9554

# some notes
* package.json sideEffects
 if you set sideEffecs to false, css gets removed. Therefore I added "sideEffects": [
                                                                     		"*.css",
                                                                     		"*.scss",
                                                                     		"*.vue"
                                                                     	]

* I'm using gulp to build 3 + 1 module in parallel. I build a modern version, a client version (es5) and a ssr/server version. Futhermore a nuxt module
is built to register assets that a module is using.

* the nuxt module
the module is actually a "trick" to automatically register all assets this library exposes. If you do not use nuxt and would like to use a library that has
more assets and they are not packed within webpack than you woudl have to deal with it by yourself. The module approach solve this for you in background.

I added two subfoldesr in assets "images" (for png,jpg,svg,etc) and fonts (woff2,svg,..etc) to demonstrate this. the fonts directory is empty though, play around with it ;)
 
* demo
there is a demo file included, you can run the library with it by itself. type "npm run dev-lib" to start it. 

* async components (see components/index.ts)
all components are async, check out the componets/index.ts file.
This is the syntax for async components () => import(...);, which allows webpack to split up the bundle in more smaller chunks.

* webpack and monorepo.
very important when using a monorepo like this one here, ensure that webpack resolve.symlinks is false.

* vue and monoprepo.
beware that a monorepo can install a lot in different "vue" node_modules. therefore it is important to hoist your dependencies.
e.g. if you see something like  Property or method "_ssrNode" is not defined on the instance but referenced during render.  , you probably
have multiple instances of vue lying around.

## get started
to install needed dependencies
* npm install && npm run bootstrap

### build library
npm run build-lib

### start nuxt dev server
npm run dev


