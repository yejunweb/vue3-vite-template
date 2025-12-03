import { onError, onLaunch } from '@dcloudio/uni-app'
import { createSSRApp } from 'vue'
import App from './App.vue'
import devToolsConfig from './devTools/config.js'
import mpDevBubble from './devTools/core/components/mpDevBubble.vue'
import devTools from './devTools/index.js'
import { requestInterceptor } from './http/interceptor'
import { routeInterceptor } from './router/interceptor'

import store from './store'
import '@/style/index.scss'
import 'virtual:uno.css'

export function createApp() {
    const app = createSSRApp(App)
    app.use(store)
    app.use(routeInterceptor)
    app.use(requestInterceptor)

    // 挂载Devtools
    app.use(devTools, devToolsConfig)
    // 注册小程序端专用的拖动浮标组件
    app.component('mpDevBubble', mpDevBubble)

    return {
        app,
    }
}

onError((err) => {
    try {
    // 挂载devTools全局报错拦截
        uni.$dev.errorReport(err, 'at App.vue onError', 'oe')
    } catch (error) {}
})
onLaunch((ctx) => {
    try {
    // 挂载APP启动日志提交
        uni.$dev.logReport(`appOnLaunch>${JSON.stringify(ctx)}`)
    } catch (error) {}
})
