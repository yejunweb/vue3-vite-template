// POST /userservice/auth/login - 账号密码登录
export interface LoginData {
    loginName: string;
    password: string;
    code: string;
    uuid: string;
}
