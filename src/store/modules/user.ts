import type { UserInfoData } from '@/api/types/auth'
import { defineStore } from 'pinia'
import { getInfo } from '@/api/modules/auth'
import { useUniStorage } from '@/utils/storage'

export const useStoreUser = defineStore('user', () => {
    const auth = useUniStorage('auth', {
        token: '',
    })
    const user = useUniStorage<Partial<UserInfoData>>('user', {})

    const setAuth = ({ token }: { token: string }) => {
        if (token && token !== auth.value.token) auth.value.token = token
    }

    const getUser = async () => {
        const res = await getInfo()
        user.value = res.user
    }

    const logout = () => {
        auth.value = {
            token: '',
        }
        user.value = {}
    }

    const hasLogin = computed(() => {
        return !!auth.value?.token
    })

    return {
        auth,
        user,
        hasLogin,
        setAuth,
        getUser,
        logout,
    }
})
