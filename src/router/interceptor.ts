import { useStoreUser } from '@/store/modules/user'
import { isPageTabbar, tabbarStore } from '@/tabbar/store'
import { getAllPages, getLastPage, HOME_PAGE, isDevMode, parseUrlToObj } from '@/utils/index'
import { EXCLUDE_LOGIN_PATH_LIST, LOGIN_PAGE, NOT_FOUND_PAGE, SYSTEM_INTERNAL_PATHS } from './config'

export function judgeIsExcludePath(path: string) {
    if (!isDevMode()) {
        return EXCLUDE_LOGIN_PATH_LIST.includes(path)
    }
    const allExcludeLoginPages = getAllPages('excludeLoginPath') // dev 环境下，需要每次都重新获取，否则新配置就不会生效
    return EXCLUDE_LOGIN_PATH_LIST.includes(path) || (isDevMode() && allExcludeLoginPages.some(page => page.path === path))
}

// 检查是否为系统内部页面
export function isSystemInternalPath(path: string): boolean {
    return SYSTEM_INTERNAL_PATHS.includes(path)
}

// 检查路由是否存在
export function isRouteExists(path: string): boolean {
    // 系统内部页面始终认为存在
    if (isSystemInternalPath(path)) {
        return true
    }

    const allPages = getAllPages()
    return allPages.some(page => page.path === path) || path === '/'
}

export const navigateToInterceptor = {
    // 注意，这里的 url 是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
    invoke({ url, query }: { url: string, query?: Record<string, string> }) {
        if (url === undefined) {
            return
        }
        let { path, query: _query } = parseUrlToObj(url)
        const myQuery = { ..._query, ...query }

        // 处理相对路径
        if (!path.startsWith('/')) {
            const currentPath = getLastPage()?.route || ''
            const normalizedCurrentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`
            const baseDir = normalizedCurrentPath.substring(0, normalizedCurrentPath.lastIndexOf('/'))
            path = `${baseDir}/${path}`
        }

        // 系统内部页面直接放行（不检查路由存在性，不进行登录拦截）
        if (isSystemInternalPath(path)) {
            return true
        }

        // 处理路由不存在的情况
        if (!isRouteExists(path)) {
            console.warn('路由不存在:', path)
            uni.navigateTo({ url: NOT_FOUND_PAGE })
            return false // 明确表示阻止原路由继续执行
        }

        // 处理直接进入路由非首页时，tabbarIndex 不正确的问题
        tabbarStore.setAutoCurIdx(path)

        const storeUser = useStoreUser()
        if (storeUser.hasLogin) {
            if (path !== LOGIN_PAGE) {
                return true // 明确表示允许路由继续执行
            }
            else {
                console.log('已经登录，但是还在登录页', myQuery.redirect)
                const url = myQuery.redirect || HOME_PAGE
                if (isPageTabbar(url)) {
                    uni.switchTab({ url })
                }
                else {
                    uni.navigateTo({ url })
                }
                return false // 明确表示阻止原路由继续执行
            }
        }
        let fullPath = path

        if (Object.keys(myQuery).length) {
            fullPath += `?${Object.keys(myQuery).map(key => `${key}=${myQuery[key]}`).join('&')}`
        }
        const redirectUrl = `${LOGIN_PAGE}?redirect=${encodeURIComponent(fullPath)}`

        // 需要登录里面的 EXCLUDE_LOGIN_PATH_LIST 表示白名单，可以直接通过
        if (judgeIsExcludePath(path)) {
            return true // 明确表示允许路由继续执行
        }
        // 否则需要重定向到登录页
        else {
            if (path === LOGIN_PAGE) {
                return true // 明确表示允许路由继续执行
            }
            uni.navigateTo({ url: redirectUrl })
            return false // 明确表示阻止原路由继续执行
        }
    },
}

// 针对 chooseLocation 的特殊处理
export const chooseLocationInterceptor = {
    invoke(options: any) {
        return true // 直接放行 chooseLocation 调用
    },
}

export const routeInterceptor = {
    install() {
        uni.addInterceptor('navigateTo', navigateToInterceptor)
        uni.addInterceptor('reLaunch', navigateToInterceptor)
        uni.addInterceptor('redirectTo', navigateToInterceptor)
        uni.addInterceptor('switchTab', navigateToInterceptor)

        // 添加 chooseLocation 的拦截器，确保直接放行
        uni.addInterceptor('chooseLocation', chooseLocationInterceptor)
    },
}
