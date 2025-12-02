import { getAllPages } from '@/utils'

export const LOGIN_PAGE = '/pages/login/login'
export const NOT_FOUND_PAGE = '/pages/404/index'

// 在 definePage 里面配置了 excludeLoginPath 的页面，功能与 EXCLUDE_LOGIN_PATH_LIST 相同
export const excludeLoginPathList = getAllPages('excludeLoginPath').map(page => page.path)

// 排除在外的列表（白名单列表）
export const EXCLUDE_LOGIN_PATH_LIST = [
    ...excludeLoginPathList, // 都是以 / 开头的 path
]

// 系统内部页面白名单（不需要检查路由存在性）
export const SYSTEM_INTERNAL_PATHS = [
    '/__uniappchooselocation', // 选择位置页面
    '/__uniapproute', // 路由页面
    '/__uniappfilepicker', // 文件选择器
    '/__uniappimagepicker', // 图片选择器
]
