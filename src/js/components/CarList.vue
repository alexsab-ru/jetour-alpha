<script>
import { ref, onMounted } from 'vue'
import CarItem from "./CarItem.vue";

import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
const lightbox = GLightbox({});

import { modal, closeModal } from'../modules/modals';

export default {
    components: {
        CarItem
    },
    setup() {
        const cars = ref(null)
        fetch('/cars.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                cars.value = data.vehicles.vehicle;
                const urlParams = new URLSearchParams(location.search);
                switch(urlParams.get('model')) {
                    case 'dashing':
                        cars.value.sort((a,b)=>a.model.localeCompare(b.model));
                        break;
                    case 'x90plus':
                        break;
                    default:
                }
            });

        onMounted(() => {
            setTimeout(() => {
                lightbox.reload();
                modal();
                closeModal();
            }, 1000)
        })

        return {
            cars
        }
    },
}
</script>

<template>
    <div class="container">
        <h2 class="text-center text-xl sm:text-4xl font-medium mb-14">Автомобили в наличии</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <car-item v-for="car in cars" :key="car.vin" :car="car" class="w-auto" />
        </div>
    </div>
</template>