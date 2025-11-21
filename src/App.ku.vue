<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@/hooks/useTheme'
import Tabbar from '@/tabbar/index.vue'
import { isPageTabbar } from '@/tabbar/store'
import { currRoute } from '@/utils'

const { theme, themeVars } = useTheme({
    // 配置主题变量、参考 ConfigProviderThemeVars
})

const isCurrentPageTabbar = ref(true)

onShow(() => {
    console.log('App.ku.vue onShow', currRoute())
    const { path } = currRoute()
    // Issues：本地是 '/pages/index/index'，线上是 '/' 导致线上 tabbar 不见了
    // 所以这里需要判断一下，如果是 '/' 就当做首页，也要显示 tabbar
    if (path === '/') {
        isCurrentPageTabbar.value = true
    }
    else {
        isCurrentPageTabbar.value = isPageTabbar(path)
    }
})
</script>

<template>
    <view>
        <wd-config-provider :theme="theme" :theme-vars="themeVars">
            <KuRootView />
            <wg-global-loading />
        </wd-config-provider>
        <Tabbar v-if="isCurrentPageTabbar" />
    </view>
</template>
