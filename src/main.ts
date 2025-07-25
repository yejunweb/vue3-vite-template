import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:svg-icons-register'; // Here the svg sprite map has been generated
import '@src/styles/global.scss';
import 'virtual:uno.css';
import { router } from '@src/router';
import '@src/router/routerGuard';
import { store } from '@src/store';

export const app = createApp(App);

app.use(router).use(store).mount('#app');
