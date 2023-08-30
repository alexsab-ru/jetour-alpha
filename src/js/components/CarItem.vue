<script>
import { useLocaleString } from "../use/numbers";
import { useTranslit } from "../use/translit";
import CarItemThumbnail from './CarItemThumbnail.vue';
import CarDescrItem from './CarDescrItem.vue';

export default {
	components: { CarItemThumbnail, CarDescrItem },
	props: {
		car: Object,
	},
	setup(props) {
		const images = [1, 5, 10];

		const carInfo = [
			{label: 'Комплектация:', key: 'complectation', icon: '/img/icons/equipment.svg'},
			{label: 'VIN:', key: 'vin', icon: '/img/icons/vin.svg'},
			{label: 'Кузов:', key: 'bodyConfiguration', icon: '/img/icons/car.svg'},
			{label: 'Год:', key: 'year', icon: '/img/icons/data.svg'},
			{label: 'Пробег:', key: 'mileage', icon: '/img/icons/engine.svg'},
			{label: 'Цвет:', key: 'bodyColor', icon: '/img/icons/color.svg'},
			{label: 'Привод:', key: 'driveType', icon: '/img/icons/privod.svg'},
			{label: 'КПП:', key: 'gearboxType', icon: '/img/icons/gear.svg'},
			{label: 'Двигатель:', key: 'modification', icon: '/img/icons/all-engine.svg'},
			{label: 'Скидка за кредит', key: 'credit', icon: '/img/icons/money.svg'},
			{label: 'Скидка по Трейд-ин', key: 'tradeinDiscount', icon: '/img/icons/trade-in.svg'},
		];

		return {
			useLocaleString,
			useTranslit,
			images,
			carInfo
		};
	},
};
</script>

<template>
	<div
		class="car"
		data-aos="fade-up"
		data-aos-offset="100"
	>
		<a :id="car.vin" class="anchor"></a>
		<a
			href="#common-modal" 
			class="popup-link car-link modal-link-parent" 
			:id="car.vin+'-car'"
			data-title="Хочу скидку" 
			:data-form_name="`Хочу скидку. ${car.model} VIN(${car.vin})`">
			<h2 class="!mb-6">{{ car.model }}</h2>
		</a>

		<div class="top_number left-0" v-if="car.price && car.priceWithDiscount">
			<div class="bg-accent px-2 py-1 ml-[1px]">
				Выгода&nbsp;{{ useLocaleString(Number(car.price - car.priceWithDiscount)) }}
			</div>
		</div>
		<div class="preview-slider mb-4">
			<div class="preview-list aspect-[4/3]">
				<!-- Если фотобанк заполнен -->
				<template v-if="car.photos.photo.length">
					<template
						v-for="(img, idx) in car.photos.photo"
						:key="img"	
					>
						<car-item-thumbnail
							v-if="idx <= 4"
							:src="img"
							:href="img"
							:no-height="false"
							:idx="idx"
							:car="car"
						/>
						<car-item-thumbnail
							v-else
							:src="img"
							:href="img"
							:no-height="false"
							:idx="idx"
							:image="false"
							class="!hidden"
							:car="car"
						/>
					</template>
				</template>
				<template v-else-if="car.image">
					<!-- Если фотобанк не заполнен -->
					<car-item-thumbnail
						v-for="(img, idx) in images"
						:key="img"
						:src="car.image + img + '.png'"
						:href="car.image + (img*4) + '.png'"
						:idx="idx"
						:car="car"
					/>
				</template>
				<img src="/img/no-foto.jpg" alt="No Photo" class="absolute h-full w-full object-cover object-center" v-else>
			</div>
		</div>
		<div class="descr">
			<template
				v-for="info in carInfo"
				:key="info.label"
			>
				<car-descr-item 
					v-if="car[info.key]"
					:info="info"
					:value="
						info.key === 'trade_in' 
						? Number(car.trade_in) 
						: info.key === 'credit' 
						? Number(car.credit.replace(/[^0-9]/g,''))
						: info.key === 'mileage'
						? car.mileage+'&nbsp;км.'
						: info.key === 'bodyColor'
						? useTranslit(car.bodyColor)
						: info.key === 'driveType'
						? useTranslit(car.driveType)
						: info.key === 'gearboxType'
						? useTranslit(car.gearboxType)
						: car[info.key]
					"
				/>
			</template>
		</div>
		<!-- /descr -->

		<div class="bottom_number">
			<div class="relevant-price val-price">
				{{ useLocaleString(Number(car.priceWithDiscount)) }}
			</div>
			<s class="old-price" v-if="car.price">{{ useLocaleString(Number(car.price)) }}</s>
		</div>
		<div class="flex flex-wrap gap-y-3 absolute left-0 bottom-0 w-full">
			<a 
				href="#common-modal" 
				class="popup-link btn max-sm:flex-grow sm:w-1/2 !px-0 max-sm:!px-3 max-sm:!py-2 text-center text-sm 2xl:text-base" 
				data-title="Хочу скидку" 
				:data-form_name="`Хочу скидку. ${car.model} VIN(${car.vin})`">
				Хочу скидку
			</a>
			<a 
				href="#common-modal" 
				class="popup-link btn black max-sm:flex-grow sm:w-1/2 !px-0 max-sm:!px-3 max-sm:!py-2 text-center text-sm 2xl:text-base" 
				:data-title="`Расчитать кредит <span class='uppercase whitespace-nowrap'>${car.brand} ${car.model}</span>`" 
				:data-form_name="`Расчитать кредит. ${car.model} VIN(${car.vin})`">
				Расчитать кредит
			</a>
		</div>
	</div>
</template>
