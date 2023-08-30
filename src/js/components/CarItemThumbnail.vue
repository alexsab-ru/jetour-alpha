<script>
import { computed } from 'vue'
	export default {
		props: {
			car: Object,
			src: String,
			href: String,
			idx: Number,
			noHeight: {
				type: Boolean,
				default: true
			},
			image: {
				type: Boolean,
				default: true
			}
		},
	}
</script>

<template>
	<a
		:href="href"
		class="glightbox preview-link"
		:data-gallery="car.id + '-' + car.vin"
	>
		<div 
			v-if="image"
			:class="{'no-height': noHeight}"
			class="preview-img" 
		>
			<img
				:class="car.kia_id"
				:src="src"
				:data-src="src"
				:alt="car.model_full + ' ' + car.color_rus"
			/>
			<template v-if="!noHeight">
				<div class="preview-total" v-if="idx === 4 && car.photos.photo.length > 5">
					Еще <br />
					{{ car.photos.photo.length - 5 }} фото
				</div>
			</template>
		</div>
	</a>
</template>
