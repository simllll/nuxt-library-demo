<template>
	<Profile :user="user" :show-documents="showDocuments"></Profile>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator';
import { IAPIUser } from '@hokify/common';
import Profile from './cv/components/CvProfile.vue';

@Component({
	name: 'Main',
	components: {
		Profile
	}
})
export default class Main extends Vue {
	@Prop({ type: Boolean, default: true }) readonly showDocuments!: boolean;

	@Prop({ type: Object, required: false }) readonly user?: IAPIUser;
}
</script>

<style lang="scss">
@import 'cv/assets/styles/tailwind.scss';
@import 'cv/assets/styles/pwa.scss';
</style>
