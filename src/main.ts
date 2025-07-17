import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:svg-icons-register'; // Here the svg sprite map has been generated
import '@src/styles/global.scss';
import 'virtual:uno.css';
import { router } from '@src/router';
import '@src/router/routerGuard';
import { store } from '@src/store';

export const app = createApp(App);

app.use(router)
    .use(store)
    .mount('#app')
    .$nextTick(() => {
        // 取消加载操作
        window.postMessage({ payload: 'removeLoading' }, '*');
        // 监听主进程信息
        window.ipcRenderer.on('message-form-main', (_event, message) => {
            console.log('message-form-main: ', message);
        });
        // 向主进程发送信息
        window.ipcRenderer.send('message-from-renderer', 'This message is from renderer process！');
    });
