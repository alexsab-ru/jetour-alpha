<script>
import { computed } from 'vue'
import { useLocaleString } from '../use/numbers'

export default {
	props: ['info', 'value'],
	setup(props){

		const out = computed(() => {
			const value = props.value;
			if(typeof value === 'number'){
				return useLocaleString(value);
			}
			return value;
		})

		return {
			out
		}
	}
}
</script>

<template>
	<div class="descr-item">
		<img
			class="icon-limit"
			:src="info.icon"
		/>
		<div class="descr-text" v-html="info.label+' '+out"></div>
	</div>
</template>