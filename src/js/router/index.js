import {createRouter, createWebHistory} from 'vue-router';
const Home = { template: '<div></div>' }

const routes = [
    { 
        path: '/',
        component: Home
    },
    { 
        path: '/cars', 
        name: 'cars',
        component: () => import('../components/CarList.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router;