import Vue from 'vue';
import * as moment from 'moment';
import Demo from './Demo.vue';
import Lib from '../src/index';

Vue.config.productionTip = false;

Lib.install(Vue, {
	moment,
	publicPath: ''
});

// eslint-disable-next-line no-new
const vue = new Vue({
	el: '#app',
	render: h => h(Demo)
});
