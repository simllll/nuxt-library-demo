<template>
  <div class="container">
	 <Test>hallo2</Test>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { Test, CvDocuments } from 'test-component-lib';

// Vue.component('Test', Test);
export default {
  components: {
    Logo,
    Test,
      CvDocuments,
	//  HelloWorld
  },

  created() {
    // console.log('X', X);
    // console.log('Test', Test);
     // console.log('test', test);
//      console.log('HelloWorld', HelloWorld);
  }
}
</script>

<style lang="scss">
@import "~test-component-lib/dist/index";
</style>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
