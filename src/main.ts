import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:svg-icons-register'; // Here the svg sprite map has been generated
import '@src/styles/global.scss';
import 'virtual:uno.css';
import { router } from '@src/router';
import '@src/router/routerGuard';
import { store } from '@src/store';
import { setStoreByUrlParams, isFromCrmFamily } from './utils/subApp.js';
import { useStoreUser } from '@src/store/modules/user';

/* 接入微观E家：通过 URL 设置参数 */
setStoreByUrlParams();

export const app = createApp(App);

// 需要使用 userStore store 单独提前挂载
app.use(store);
useStoreUser().bootstrapAuth();

app.use(router);
app.mount('#app');

router.isReady().then(() => {
    /* 接入微观E家：页面挂载后取消 Loading 展现 */
    if (isFromCrmFamily()) {
        window.postMessage({ payload: 'removeLoading' }, '*');
    }
});
