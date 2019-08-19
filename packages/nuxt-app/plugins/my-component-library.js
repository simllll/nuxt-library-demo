import Vue from 'vue';
import SharedComponentsPlugin from 'test-component-lib';

export default ctx => {
    const { app } = ctx;
    Vue.use(SharedComponentsPlugin, {
        publicPath: process.env.publicPath,
        moment: ctx.$moment
    });
};
