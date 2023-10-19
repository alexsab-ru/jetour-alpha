<script>
	import { ref, onMounted, computed, watch } from "vue";
	import CarItem from "./CarItem.vue";
	import Loader from "./Loader.vue";

	import GLightbox from "glightbox";
	import "glightbox/dist/css/glightbox.min.css";
	const lightbox = GLightbox();

	import { modal, closeModal } from "../modules/modals";
	import { useNumWord } from "../use/numbers";
	import { useTranslit } from "../use/translit";

	export default {
		components: {
			CarItem,
			Loader,
		},
		setup() {
			const cars = ref(null);
			const sort = ref("asc");
			const loading = ref(true);
			const open = ref(false);
			function getCars() {
				fetch("/cars.json")
					.then((response) => {
						return response.json();
					})
					.then(async (data) => {
						cars.value = await data.vehicles.vehicle;
					});
			}

			getCars();

			const count = computed(() => {
				if (cars.value) {
					return cars.value.length
						? `${cars.value.length} ${useNumWord(cars.value.length)} в наличии`
						: "Нет в наличии";
				}
			});

			const sorted = computed(() => {
				if (cars.value) {
					switch (sort.value) {
						case "asc":
							return cars.value.sort((a, b) => (a.model > b.model ? 1 : -1));
							break;
						case "price_down":
							return cars.value.sort((a, b) => (a.price < b.price ? 1 : -1));
							break;
						case "price_up":
							return cars.value.sort((a, b) => (a.price > b.price ? 1 : -1));
							break;
						case "default":
							return cars.value.sort((a, b) => (a.model < b.model ? 1 : -1));
							break;
						default:
							return cars.value;
							break;
					}
				}
			});

			const sorting = (val) => {
				loading.value = true;
				open.value = false;
				setTimeout(() => {
                    sort.value = val;
					loading.value = false;
				}, 500);
			};

			onMounted(() => {
				setTimeout(() => {
					lightbox.reload();
					modal();
					closeModal();
					loading.value = false;
				}, 500);
			});

			return {
				sorting,
				sorted,
				count,
				sort,
				loading,
				useTranslit,
				open,
			};
		},
	};
</script>

<template>
	<Loader v-if="loading" />
	<div class="container">
		<h1 class="text-xl sm:text-4xl font-medium mb-3">Автомобили Jetour в&nbsp;наличии в&nbsp;Самаре</h1>

		<p class="mb-4">{{ count }}</p>
		<hr />

		<div class="flex items-center gap-4 my-5">

			<span>Сортировать по:</span>

			<div class="relative min-w-[250px] w-auto">
				<span
					class="border py-2 px-4 cursor-pointer flex items-center justify-between gap-5 flex-nowrap"
					@click="open = !open"
				>
					{{ useTranslit(sort) }}
					<span
						class="mdi mdi-chevron-down text-2xl transition-transform duration-300 origin-center"
						:class="{ '-rotate-180': open }"
					></span>
				</span>
				<div
					class="absolute top-full left-0 min-w-fit w-full border bg-white shadow-xl z-10 max-h-[165px] overflow-y-auto transition-all duration-300 custom-scroll"
					:class="{
						'invisible opacity-0 -translate-y-2': !open,
						'visible opacity-100 translate-y-0': open,
					}"
				>
					<a
						href="#"
						class="block py-2 px-4 whitespace-nowrap transition-colors duration-300 hover:bg-gray-200"
						:class="{ 'bg-gray-200': sort === item }"
						v-for="item in ['asc', 'price_down', 'price_up', 'default']"
						:key="item"
						@click.prevent="sorting(item)"
						>{{ useTranslit(item) }}</a
					>
				</div>
			</div>

		</div>

		<hr />

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
			<CarItem v-for="car in sorted" :key="car.vin" :car="car" class="w-auto" />
		</div>
	</div>
</template>
