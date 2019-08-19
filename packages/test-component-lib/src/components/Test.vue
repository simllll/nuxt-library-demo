<template>
	<div>
		<!-- simple test for: css, assets and slots -->
		<div class="test">
			<h1>It Works!!</h1>
			Slot: <slot>no default slot provided</slot>
			<img src="~assets/images/unknown_user.png">
		</div>
		<!-- tailwind test -->
		<div>
			<div class="md:mcl-flex">
				<div class="md:mcl-flex-shrink-0">
					<img class="mcl-rounded-lg md:mcl-w-56" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" alt="Woman paying for a purchase">
				</div>
				<div class="mcl-mt-4 md:mcl-mt-0 md:mcl-ml-6">
					<div class="mcl-uppercase mcl-tracking-wide mcl-text-sm mcl-text-indigo-600 mcl-font-bold">Marketing</div>
					<a href="#" class="mcl-block mcl-mt-1 mcl-text-lg mcl-leading-tight mcl-font-semibold mcl-text-gray-900 hover:mcl-underline">Finding customers for your new business</a>
					<p class="mcl-mt-2 mcl-text-gray-600">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
	components: {}
})
export default class Test extends Vue {}
</script>
<style lang="scss" src="~styles/my-custom-library-base.scss" />

<style lang="scss" scoped>
	div.test {
		background-color: green;
		h1 {
			color: red;
		}
	}
</style>
