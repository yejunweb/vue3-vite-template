// 认证模式类型
export type AuthMode = 'single' | 'double'

// 单Token响应类型
export interface ISingleTokenRes {
    token: string
}

/**
 * 登录返回的信息，其实就是 token 信息
 */
export type IAuthLoginRes = ISingleTokenRes

/**
 * 用户信息
 */
export interface IUserInfoRes {
    userId: number
    username: string
    nickname: string
    avatar?: string
    [key: string]: any // 允许其他扩展字段
}

/**
 * 上传成功的信息
 */
export interface IUploadSuccessInfo {
    fileId: number
    originalName: string
    fileName: string
    storagePath: string
    fileHash: string
    fileType: string
    fileBusinessType: string
    fileSize: number
}
