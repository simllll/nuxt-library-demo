<template>
	<Test>Main</Test>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Profile from './myComponents/components/test.vue';

@Component({
	name: 'Main',
	components: {
		Profile
	}
})
export default class Main extends Vue {

}
</script>

<style lang="scss">

</style>
