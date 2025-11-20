import { defineStore } from 'pinia'
import * as api from '@/api/modules/auth'

export const useStoreCaptcha = defineStore('captcha', () => {
    const captchaInfo = ref<{
        uuid: string
        img: string
    }>({
        uuid: '',
        img: '',
    })

    const getCaptchaInfo = async () => {
        const res = await api.captchaImage()
        const { uuid, img } = res as any
        Object.assign(captchaInfo.value, {
            uuid,
            img: `data:image/jpeg;base64,${img}`,
        })
    }

    getCaptchaInfo()

    return {
        captchaInfo,
        getCaptchaInfo,
    }
})
