import type { ToastOptions } from 'wot-design-uni/components/wd-toast/types'
import { defineStore } from 'pinia'
import { CommonUtil } from 'wot-design-uni'
import { getLastPage } from '@/utils/index'

import { createStore } from '@/utils/storage'

const { useUniStorage } = createStore('wg-global-loading')

const defaultOptions: ToastOptions = {
    show: false,
}

export const useGlobalLoading = defineStore('wg-global-loading', () => {
    const loadingOptions = useUniStorage<ToastOptions>('loadingOptions', defaultOptions)
    const currentPage = useUniStorage<string>('currentPage', '')

    // 加载提示
    const loading = (option: ToastOptions | string) => {
        currentPage.value = getLastPage().route || ''
        loadingOptions.value = CommonUtil.deepMerge({
            iconName: 'loading',
            duration: 0,
            cover: true,
            position: 'middle',
            show: true,
        }, typeof option === 'string' ? { msg: option } : option) as ToastOptions
    }

    // 关闭 Toast
    const close = () => {
        loadingOptions.value = defaultOptions
        currentPage.value = ''
    }

    return {
        loadingOptions,
        currentPage,
        loading,
        close,
    }
})
