<script>
import { ref } from 'vue'
import CarItem from "./CarItem.vue";
export default {
    components: {
        CarItem 
    },
    setup() {
        const cars = ref(null)
        fetch('cars.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                cars.value = data.vehicles.vehicle;
            });

        return {
            cars
        }
    },
}
</script>

<template>
    <div class="container">
        <h2 class="text-center text-xl sm:text-4xl font-medium mb-14">Автомобили в наличии</h2>
        <div class="flex flex-wrap justify-between">
            <car-item v-for="car in cars" :key="car.vin" :car="car" class="w-auto" />
        </div>
    </div>
</template>