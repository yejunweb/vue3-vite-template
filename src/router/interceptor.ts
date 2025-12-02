import { useStoreUser } from '@/store/modules/user'
import { isPageTabbar, tabbarStore } from '@/tabbar/store'
import { getAllPages, getLastPage, HOME_PAGE, isDevMode, parseUrlToObj } from '@/utils/index'
import { EXCLUDE_LOGIN_PATH_LIST, LOGIN_PAGE, NOT_FOUND_PAGE, SYSTEM_INTERNAL_PATHS } from './config'

/**
 * 通用 query 对象类型定义，用于构建重定向 URL 等场景
 */
type Query = Record<string, string | number | boolean | undefined | null>

/**
 * 判断当前路径是否在“免登录白名单”中
 *
 * - 生产环境：仅检查 `EXCLUDE_LOGIN_PATH_LIST`
 * - 开发环境：在白名单的基础上，额外检查 `pages.json` 中配置的 `excludeLoginPath` 页面
 *
 * @param path 路由路径（以 `/` 开头）
 * @returns 是否属于免登录路径
 */
export function judgeIsExcludePath(path: string): boolean {
    const inWhiteList = EXCLUDE_LOGIN_PATH_LIST.includes(path)
    const devMode = isDevMode()

    if (!devMode) {
        return inWhiteList
    }

    // dev 环境下，需要每次都重新获取，否则新配置就不会生效
    const allExcludeLoginPages = getAllPages('excludeLoginPath')
    const devMatched = allExcludeLoginPages.some(page => page.path === path)

    return inWhiteList || devMatched
}

/**
 * 检查是否为系统内部页面
 *
 * 这些页面通常为框架级或系统保留路由，不参与登录拦截和权限校验
 *
 * @param path 路由路径
 * @returns 是否为系统内部页面
 */
export function isSystemInternalPath(path: string): boolean {
    return SYSTEM_INTERNAL_PATHS.includes(path)
}

/**
 * 检查路由是否存在
 *
 * - 系统内部页面始终视为存在
 * - 普通页面从 `pages.json` 中的所有页面列表进行匹配
 *
 * @param path 路由路径
 * @returns 路由是否存在
 */
export function isRouteExists(path: string): boolean {
    // 系统内部页面始终认为存在
    if (isSystemInternalPath(path)) {
        return true
    }

    const allPages = getAllPages()
    return allPages.some(page => page.path === path) || path === '/'
}

/**
 * 将相对路径转换为以 `/` 开头的绝对路径
 *
 * - 若 `path` 本身为空或已是绝对路径，则原样返回
 * - 否则以当前页面的目录作为基准拼接
 *
 * @param path 可能为相对路径的路由路径
 * @returns 以 `/` 开头的绝对路径
 */
function normalizeToAbsolutePath(path: string): string {
    if (!path || path.startsWith('/')) {
        return path
    }

    const currentPath = getLastPage()?.route || ''
    const normalizedCurrentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`
    const baseDir = normalizedCurrentPath.substring(0, normalizedCurrentPath.lastIndexOf('/'))

    return `${baseDir}/${path}`
}

/**
 * 将 query 对象转换为 URL 查询字符串
 *
 * 会自动过滤掉 `undefined`/`null`，并对 key / value 做 `encodeURIComponent` 处理
 *
 * @param query query 参数对象
 * @returns 不包含前缀 `?` 的查询字符串
 */
function buildQueryString(query: Query): string {
    const entries = Object.entries(query).filter(([, value]) => value !== undefined && value !== null)
    if (!entries.length) {
        return ''
    }

    return entries
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&')
}

/**
 * 根据目标路径和 query 构建带有 `redirect` 参数的登录页 URL
 *
 * 例如：`/login?redirect=/pages/a/index%3Fid%3D1`
 *
 * @param path 目标业务路由路径
 * @param query 需要带回的 query 参数
 * @returns 最终用于 `uni.navigateTo` 的登录页 URL
 */
function buildRedirectUrl(path: string, query: Query): string {
    const queryString = buildQueryString(query)
    const fullPath = queryString ? `${path}?${queryString}` : path

    return `${LOGIN_PAGE}?redirect=${encodeURIComponent(fullPath)}`
}

/**
 * 统一的路由跳转拦截器：
 *
 * - 做路径归一化（支持相对路径）
 * - 检查路由是否存在，若不存在跳转到 404 页面
 * - 维护 tabbar 选中状态
 * - 根据登录状态、白名单等规则决定是否允许继续跳转或重定向到登录页
 */
export const navigateToInterceptor = {
    // 注意，这里的 url 是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
    invoke({ url, query }: { url: string, query?: Query }) {
        if (!url) {
            return
        }

        let { path, query: _query } = parseUrlToObj(url)
        path = normalizeToAbsolutePath(path)

        const myQuery: Query = { ..._query, ...query }

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

        // 已登录场景
        if (storeUser.hasLogin) {
            // 已登录访问非登录页，直接放行
            if (path !== LOGIN_PAGE) {
                return true
            }

            // 已登录但访问登录页，根据 redirect 或 HOME_PAGE 跳转
            console.log('已经登录，但是还在登录页', myQuery.redirect)
            const redirect = (myQuery.redirect as string) || HOME_PAGE

            if (isPageTabbar(redirect)) {
                uni.switchTab({ url: redirect })
            } else {
                uni.navigateTo({ url: redirect })
            }

            return false // 明确表示阻止原路由继续执行
        }

        // 未登录场景
        // 需要登录里面的 EXCLUDE_LOGIN_PATH_LIST 表示白名单，可以直接通过
        if (judgeIsExcludePath(path) || path === LOGIN_PAGE) {
            return true // 明确表示允许路由继续执行
        }

        const redirectUrl = buildRedirectUrl(path, myQuery)
        uni.navigateTo({ url: redirectUrl })

        return false // 明确表示阻止原路由继续执行
    },
}

/**
 * 针对 `uni.chooseLocation` 的拦截器
 *
 * 目前业务上对该 API 不做任何限制，统一直接放行
 */
export const chooseLocationInterceptor = {
    invoke(_options: any) {
        return true // 直接放行 chooseLocation 调用
    },
}

/**
 * 统一安装路由相关拦截器
 *
 * 在应用入口处调用一次 `routeInterceptor.install()` 即可完成：
 * - `navigateTo` / `reLaunch` / `redirectTo` / `switchTab` 的登录与路由校验
 * - `chooseLocation` 的放行策略
 */
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
