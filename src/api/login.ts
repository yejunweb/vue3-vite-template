import type { IAuthLoginRes, IUserInfoRes } from './types/login'
import { http } from '@/http/http'

/**
 * 登录表单
 */
export interface ILoginForm {
    username: string
    password: string
}

/**
 * 用户登录
 * @param loginForm 登录表单
 */
export function login(loginForm: ILoginForm) {
    return http.post<IAuthLoginRes>({
        url: 'https://ukw0y1.laf.run/auth/login',
        data: loginForm,
    })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
    return http.get<IUserInfoRes>({
        url: 'https://ukw0y1.laf.run/user/info',
    })
}

/**
 * 退出登录
 */
export function logout() {
    return http.get<void>({
        url: 'https://ukw0y1.laf.run/auth/logout',
    })
}
