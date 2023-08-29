<script>
import { computed } from 'vue'
import { useLocaleString } from '../use/numbers'

export default {
	props: ['info', 'value'],
	setup(props){

		const out = computed(() => {
			const value = props.value;
			if(typeof value === 'number' && props.info.key != 'year'){
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
		<div class="descr-text">{{ info.label}} <span class="font-normal">{{ out }} </span></div>
	</div>
</template>