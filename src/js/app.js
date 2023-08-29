import './modules/slider';
import './modules/functions';
import './modules/color.links';
import './modules/map';
import './modules/form';
import './modules/modals';

import { createApp } from 'vue';
// import router from './router';
import App from './App.vue';

const app = createApp(App);

// app.use(router);

app.mount('#app');