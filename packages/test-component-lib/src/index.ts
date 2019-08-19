// components
export * from './components';

let installed = false;

const HokifyCvComponents = {
	install: (Vue, params: { moment?: any; publicPath: string }) => {
		if (installed) {
			console.error('[my-custom-components] already installed');
			return;
		}
		installed = true;

		if (params.publicPath) {
			__webpack_public_path__ = `${params.publicPath}my-custom-components/`;
		}

		if (!('$moment' in Vue.prototype) && params.moment) {
			Vue.prototype.$moment = params.moment;
		}
	}
};

export default HokifyCvComponents;
