import type { LoginParams, UserInfoData } from '@/api/types/auth'
import { http } from '@/http/http'

// 获取图片验证码
export const captchaImage = () =>
    http.get({
        url: '/userservice/auth/captchaImage',
    })

// 账号密码登录
export const login = (data: LoginParams) =>
    http.post({
        url: '/userservice/auth/login',
        data,
    })

// 获取用户信息
export const getInfo = () =>
    http.get<UserInfoData>({
        url: '/userservice/auth/getInfo',
    })
