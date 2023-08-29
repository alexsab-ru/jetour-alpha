<script>
import { useLocaleString } from "../use/numbers";
import { useTranslit } from "../use/translit";
import CarItemThumbnail from './CarItemThumbnail.vue';
import CarDescrItem from './CarDescrItem.vue';

import { nextTick } from "vue";

export default {
	components: { CarItemThumbnail, CarDescrItem },
	props: {
		car: Object,
	},
	setup(props) {
		const images = [1, 5, 10];

		const carInfo = [
			{label: 'Комплектация:', key: 'complectation', icon: '/img/icons/equipment.svg'},
			{label: 'VIN:', key: 'vin_hidden', icon: '/img/icons/vin.svg'},
			{label: 'Кузов:', key: 'bodyConfiguration', icon: '/img/icons/car.svg'},
			{label: 'Год:', key: 'year', icon: '/img/icons/data.svg'},
			{label: 'Пробег:', key: 'mileage', icon: '/img/icons/engine.svg'},
			{label: 'Цвет:', key: 'bodyColor', icon: '/img/icons/color.svg'},
			{label: 'Привод:', key: 'driveType', icon: '/img/icons/privod.svg'},
			{label: 'КПП:', key: 'gearboxType', icon: '/img/icons/gear.svg'},
			{label: 'Двигатель:', key: 'modification', icon: '/img/icons/all-engine.svg'},
			{label: 'Скидка за кредит', key: 'credit', icon: '/img/icons/money.svg'},
			{label: 'Скидка по Трейд-ин от', key: 'tradeinDiscount', icon: '/img/icons/trade-in.svg'},
		];

		const modalShow = (id) => {
			nextTick(() => {
				const car = props.car
				if (id === "#credit") {
					const price = car.price1
					window.$(".contribution").find(".range").attr("max", price);
					window.$(".contribution").find(".range__interval-txt_max").text(Number(price).toLocaleString('ru-RU'));
					try {
						window.input_range.init(".kia-form", ".contribution", 0, price, 10000);
					} catch (err) {
						console.error(err);
					}
					try {
						window.input_range.init(".kia-form", ".term", 0, 72, 1);
					} catch (err) {
						console.error(err);
					}
				}
				const form = window.$(id+'-form');
				form.find('[name=model]').val(car.model_full ?? '');
				form.find('[name=vin]').val(car.vin ?? '');
				form.find('[name=price]').val(car.price1 ?? '');
				form.find('[name=year]').val(car.year ?? '');
				form.find('[name=bodytype]').val(car.bodytype ?? '');
				form.find('[name=color_rus]').val(car.color_rus ?? '');
				form.find('[name=drive]').val(car.drive ?? '');
				form.find('[name=engine]').val(car.engine ?? '');
				form.find('[name=quantity]').val(car.quantity ?? '');
				form.find('[name=credit]').val(car.credit ?? '');
				form.find('[name=trade_in]').val(car.trade_in ?? '');
				form.find('[name=benefit]').val(car.benefit1 ?? '');
				form.find('[name=complectation]').val(car.compl ?? '');
				form.find('input.'+car.dealer+'[name="dealer"]').prop( "checked", true );
				form.find('.dealer-choice').addClass("!hidden");
				form.find('.dealer-choice+div').addClass("!hidden");
				window.$(id+'-form').find('.required-field').removeClass('has-error');
				window.$.magnificPopup.open({ items: { src: id } } ?? '');
			});
		};

		return {
			useLocaleString,
			useTranslit,
			modalShow,
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
			href="#cheaper"
			:id="car.vin+'-car'"
			class="car-link modal-link-parent"
			@click.prevent="modalShow('#cheaper')"
		>
			<h2 class="!mb-6">{{ car.model }}</h2>
		</a>

		<div class="top_number d-flex" v-if="car.price && car.priceWithDiscount">
			<div class="top_number-color val-benefit">
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
		<div class="btn-wrap">
			<a
				href="#cheaper"
				class="btn btn-white modal-link"
				@click.prevent="modalShow('#cheaper')"
				><div>Хочу&nbsp;скидку</div></a
			>
			<a
				href="#credit"
				class="btn modal-link credit-link"
				@click.prevent="modalShow('#credit')"
				><div>Расчитать&nbsp;кредит</div></a
			>
		</div>
	</div>
</template>
