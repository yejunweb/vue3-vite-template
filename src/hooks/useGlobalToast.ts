import type { ToastOptions } from 'wot-design-uni/components/wd-toast/types'
import { defineStore } from 'pinia'
import { CommonUtil } from 'wot-design-uni'
import { getLastPage } from '@/utils/index'

import { createStore } from '@/utils/storage'

const { useUniStorage } = createStore('wg-global-toast')

const defaultOptions: ToastOptions = {
    duration: 2000,
    show: false,
}

export const useGlobalToast = defineStore('wg-global-toast', () => {
    const toastOptions = useUniStorage<ToastOptions>('toastOptions', defaultOptions)
    const currentPage = useUniStorage<string>('currentPage', '')

    // 打开 Toast
    const show = (option: ToastOptions | string) => {
        currentPage.value = getLastPage().route || ''
        const options = CommonUtil.deepMerge(defaultOptions, typeof option === 'string' ? { msg: option } : option) as ToastOptions
        toastOptions.value = CommonUtil.deepMerge(options, {
            show: true,
            position: options.position || 'middle',
        }) as ToastOptions
    }

    // 成功提示
    const success = (option: ToastOptions | string) => {
        show(CommonUtil.deepMerge({
            iconName: 'success',
            duration: 1500,
        }, typeof option === 'string' ? { msg: option } : option) as ToastOptions)
    }

    // 错误提示
    const error = (option: ToastOptions | string) => {
        show(CommonUtil.deepMerge({
            iconName: 'error',
            direction: 'vertical',
        }, typeof option === 'string' ? { msg: option } : option) as ToastOptions)
    }

    // 常规提示
    const info = (option: ToastOptions | string) => {
        show(CommonUtil.deepMerge({
            iconName: 'info',
        }, typeof option === 'string' ? { msg: option } : option) as ToastOptions)
    }

    // 警告提示
    const warning = (option: ToastOptions | string) => {
        show(CommonUtil.deepMerge({
            iconName: 'warning',
        }, typeof option === 'string' ? { msg: option } : option) as ToastOptions)
    }

    // 关闭 Toast
    const close = () => {
        toastOptions.value = defaultOptions
        currentPage.value = ''
    }

    return {
        toastOptions,
        currentPage,
        show,
        success,
        error,
        info,
        warning,
        close,
    }
})
