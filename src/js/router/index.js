import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    { 
        path: '/', 
        component: () => import('../components/CarList.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router;