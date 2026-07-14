import { request } from '@src/utils/request';
import type { LoginData } from './types';

// POST /userservice/auth/login - 账号密码登录
export const login = (data: LoginData) =>
    request({
        url: '/userservice/auth/login',
        method: 'post',
        data,
    });
