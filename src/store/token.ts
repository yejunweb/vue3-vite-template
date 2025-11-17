import type {
    ILoginForm,
} from '@/api/login'
import type { IAuthLoginRes } from '@/api/types/login'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
    login as _login,
    logout as _logout,
} from '@/api/login'
import { useUserStore } from './user'

// 初始化状态
const tokenInfoState: IAuthLoginRes = {
    token: '',
}

export const useTokenStore = defineStore(
    'token',
    () => {
        // 定义 token 信息
        const tokenInfo = ref<IAuthLoginRes>({ ...tokenInfoState })

        /**
         * 设置 token 信息
         * @param val token 信息
         */
        const setTokenInfo = (val: IAuthLoginRes) => {
            tokenInfo.value = val
        }

        /**
         * 登录成功后处理逻辑
         * @param tokenData 登录返回的token信息
         */
        const _postLogin = async (tokenData: IAuthLoginRes) => {
            setTokenInfo(tokenData)
            const userStore = useUserStore()
            await userStore.fetchUserInfo()
        }

        /**
         * 用户登录
         * 有的时候后端会用一个接口返回token和用户信息，有的时候会分开2个接口，一个获取token，一个获取用户信息
         * （各有利弊，看业务场景和系统复杂度），这里使用2个接口返回的来模拟
         * @param loginForm 登录参数
         * @returns 登录结果
         */
        const login = async (loginForm: ILoginForm) => {
            try {
                const res = await _login(loginForm)
                console.log('普通登录-res: ', res)
                await _postLogin(res)
                uni.showToast({
                    title: '登录成功',
                    icon: 'success',
                })
                return res
            }
            catch (error) {
                console.error('登录失败:', error)
                uni.showToast({
                    title: '登录失败，请重试',
                    icon: 'error',
                })
                throw error
            }
        }

        /**
         * 退出登录并清除用户信息
         * 注意：持久化由 pinia-plugin-persistedstate 自动处理
         */
        const logout = async () => {
            try {
                // TODO 实现自己的退出登录逻辑
                await _logout()
            }
            catch (error) {
                console.error('退出登录失败:', error)
            }
            finally {
                // 无论成功失败，都需要清除本地token信息
                console.log('退出登录-清除用户信息')
                tokenInfo.value = { ...tokenInfoState }
                const userStore = useUserStore()
                userStore.clearUserInfo()
            }
        }

        /**
         * 检查是否有登录信息（不考虑token是否过期）
         */
        const hasLogin = computed(() => {
            return !!tokenInfo.value?.token
        })

        return {
            // 核心API方法
            login,
            logout,

            // 认证状态判断
            hasLogin,

            // 调试或特殊场景可能需要直接访问的信息
            tokenInfo,
            setTokenInfo,
        }
    },
    {
        // 添加持久化配置，确保刷新页面后token信息不丢失
        persist: true,
    },
)
