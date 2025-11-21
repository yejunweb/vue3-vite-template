import type { MessageOptions, MessageResult } from 'wot-design-uni/components/wd-message-box/types'
import { defineStore } from 'pinia'
import { CommonUtil } from 'wot-design-uni'
import { getLastPage } from '@/utils/index'

import { createStore } from '@/utils/storage'

const { useUniStorage } = createStore('wg-global-message')

export type GlobalMessageOptions = MessageOptions & {
    success?: (res: MessageResult) => void
    fail?: (res: MessageResult) => void
    customClass?: string
}

export const useGlobalMessage = defineStore('wg-global-message', () => {
    const messageOptions = useUniStorage<GlobalMessageOptions | null>('messageOptions', null)
    const currentPage = useUniStorage<string>('currentPage', '')

    // 显示消息框
    const show = (option: GlobalMessageOptions | string) => {
        currentPage.value = getLastPage().route || ''
        messageOptions.value = {
            ...(CommonUtil.isString(option) ? { title: option } : option),
            cancelButtonProps: {
                round: false,
            },
            confirmButtonProps: {
                round: false,
            },
        }
    }

    // 警告框
    const alert = (option: GlobalMessageOptions | string) => {
        const options = CommonUtil.deepMerge({ type: 'alert' }, CommonUtil.isString(option) ? { title: option } : option) as MessageOptions
        options.showCancelButton = false
        show(options)
    }

    // 确认框
    const confirm = (option: GlobalMessageOptions | string) => {
        const options = CommonUtil.deepMerge({ type: 'confirm' }, CommonUtil.isString(option) ? { title: option } : option) as MessageOptions
        options.showCancelButton = true
        show(options)
    }

    // 关闭消息框
    const close = () => {
        messageOptions.value = null
        currentPage.value = ''
    }

    return {
        messageOptions,
        currentPage,
        show,
        alert,
        confirm,
        prompt,
        close,
    }
})
