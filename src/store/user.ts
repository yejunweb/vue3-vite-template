import type { IUserInfoRes } from '@/api/types/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getUserInfo,
} from '@/api/login'

// 初始化状态
const userInfoState: IUserInfoRes = {
    userId: -1,
    username: '',
    nickname: '',
    avatar: '/static/images/default-avatar.png',
}

export const useUserStore = defineStore(
    'user',
    () => {
        // 定义用户信息
        const userInfo = ref<IUserInfoRes>({ ...userInfoState })

        /**
         * 设置用户信息
         * @param val 用户信息
         */
        const setUserInfo = (val: IUserInfoRes) => {
            console.log('设置用户信息', val)
            // 若头像为空 则使用默认头像
            if (!val.avatar) {
                val.avatar = userInfoState.avatar
            }
            userInfo.value = val
        }

        /**
         * 设置用户头像
         * @param avatar 头像地址
         */
        const setUserAvatar = (avatar: string) => {
            userInfo.value.avatar = avatar
            console.log('设置用户头像', avatar)
            console.log('userInfo', userInfo.value)
        }

        /**
         * 清除用户信息
         * 注意：持久化由 pinia-plugin-persistedstate 自动处理
         */
        const clearUserInfo = () => {
            userInfo.value = { ...userInfoState }
        }

        /**
         * 获取用户信息
         * @returns 用户信息
         */
        const fetchUserInfo = async () => {
            const res = await getUserInfo()
            setUserInfo(res)
            return res
        }

        return {
            userInfo,
            clearUserInfo,
            fetchUserInfo,
            setUserInfo,
            setUserAvatar,
        }
    },
    {
        persist: true,
    },
)
