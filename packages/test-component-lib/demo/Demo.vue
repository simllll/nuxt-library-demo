<template>
	<div id="app">
		<div>
			Test
			<Test />
		</div>
		<hr>
		powered by <a href="https://hokify.at" target="_blank">hokify</a> development.
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Test } from '../src/index';

@Component({
	name: 'Demo',
	components: { Test }
})
export default class Demo extends Vue {

}
</script>
