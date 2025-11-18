import type { PageMetaDatum, SubPackages } from '@uni-helper/vite-plugin-uni-pages'
import { attempt, isError } from 'lodash-es'
import { pages, subPackages } from '@/pages.json'

export const API_DOMAINS = {
    DEFAULT: import.meta.env.VITE_SERVER_BASEURL,
}

export const getImageUrl = (path: string) => new URL(`../assets/${path}`, import.meta.url).href

export const getOSSUrl = (path: string): string => `https://shanghai-house-model.oss-accelerate.aliyuncs.com/${path}`

export const getEnv = (): string => import.meta.env.MODE

export const isDevMode = (): boolean => import.meta.env.DEV

export const isBuildMode = (): boolean => import.meta.env.PROD

export const isTestMode = (): boolean => getEnv().includes('test')

export const isProdMode = (): boolean => import.meta.env.PROD && !isTestMode()

export const parseJSON = (json: string) => {
    const parsedData = attempt(JSON.parse, json)
    if (!isError(parsedData)) {
        return parsedData
    } else {
        return {}
    }
}

export type PageInstance = Page.PageInstance<AnyObject, object> & { $page: Page.PageInstance<AnyObject, object> & { fullPath: string } }

export function getLastPage() {
    // getCurrentPages() 至少有1个元素，所以不再额外判断
    // const lastPage = getCurrentPages().at(-1)
    // 上面那个在低版本安卓中打包会报错，所以改用下面这个【虽然我加了 src/interceptions/prototype.ts，但依然报错】
    const pages = getCurrentPages()
    return pages[pages.length - 1] as PageInstance
}

/**
 * 获取当前页面路由的 path 路径和 redirectPath 路径
 * path 如 '/pages/login/login'
 * redirectPath 如 '/pages/demo/base/route-interceptor'
 */
export function currRoute() {
    const lastPage = getLastPage() as PageInstance
    if (!lastPage) {
        return {
            path: '',
            query: {},
        }
    }
    const currRoute = lastPage.$page
    // console.log('lastPage.$page:', currRoute)
    // console.log('lastPage.$page.fullpath:', currRoute.fullPath)
    // console.log('lastPage.$page.options:', currRoute.options)
    // console.log('lastPage.options:', (lastPage as any).options)
    // 经过多端测试，只有 fullPath 靠谱，其他都不靠谱
    const { fullPath } = currRoute
    // console.log(fullPath)
    // eg: /pages/login/login?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor (小程序)
    // eg: /pages/login/login?redirect=%2Fpages%2Froute-interceptor%2Findex%3Fname%3Dfeige%26age%3D30(h5)
    return parseUrlToObj(fullPath)
}

/**
 * 确保解码 URL 中的百分号编码，避免出现 %2F 这样的情况
 * @param url 需要解码的 URL
 * @returns 解码后的 URL
 */
export function ensureDecodeURIComponent(url: string) {
    if (url.startsWith('%')) {
        return ensureDecodeURIComponent(decodeURIComponent(url))
    }
    return url
}

/**
 * 路由参数转换
 * @param params 需要转换的参数
 * @returns 转换后的参数
 */
export function paramsTransform(params: Record<string, any>) {
    return Object.entries(params || {})
        .map(v => v.join('='))
        .join('&')
}

/**
 * 路由参数拼接
 * @param url 需要拼接的 URL
 * @param query 需要拼接的参数
 * @returns 拼接后的 URL
 */
export function queryTransform(url: string, query: Record<string, any>) {
    const queryStr = paramsTransform(query)
    return url + (queryStr ? `?${queryStr}` : '')
}

/**
 * 解析 url 得到 path 和 query
 * 比如输入url: /pages/login/login?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * 输出: {path: /pages/login/login, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export function parseUrlToObj(url: string) {
    const [path, queryStr] = url.split('?')
    // console.log(path, queryStr)

    if (!queryStr) {
        return {
            path,
            query: {},
        }
    }
    const query: Record<string, string> = {}
    queryStr.split('&').forEach((item) => {
        const [key, value] = item.split('=')
        // console.log(key, value)
        query[key] = ensureDecodeURIComponent(value) // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信
    })
    return { path, query }
}

/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 这里设计得通用一点，可以传递 key 作为判断依据，默认是 excludeLoginPath, 与 route-block 配对使用
 * 如果没有传 key，则表示所有的 pages，如果传递了 key, 则表示通过 key 过滤
 */
export function getAllPages(key?: string) {
    // 这里处理主包
    const mainPages = (pages as PageMetaDatum[])
        .filter(page => !key || page[key])
        .map(page => ({
            ...page,
            path: `/${page.path}`,
        }))

    // 这里处理分包
    const subPages: PageMetaDatum[] = []
        ; (subPackages as SubPackages).forEach((subPageObj) => {
        // console.log(subPageObj)
        const { root } = subPageObj

        subPageObj.pages
            .filter(page => !key || page[key])
            .forEach((page) => {
                subPages.push({
                    ...page,
                    path: `/${root}/${page.path}`,
                })
            })
    })
    const result = [...mainPages, ...subPages]
    // console.log(`getAllPages by ${key} result: `, result)
    return result
}

export function getCurrentPageI18nKey() {
    const routeObj = currRoute()
    const currPage = (pages as PageMetaDatum[]).find(page => `/${page.path}` === routeObj.path)
    if (!currPage) {
        console.warn('路由不正确')
        return ''
    }
    console.log(currPage)
    console.log(currPage.style.navigationBarTitleText)
    return currPage.style?.navigationBarTitleText || ''
}

/**
 * 首页路径，通过 page.json 里面的 type 为 home 的页面获取，如果没有，则默认是第一个页面
 * 通常为 /pages/index/index
 */
export const HOME_PAGE = `/${(pages as PageMetaDatum[]).find(page => page.type === 'home')?.path || (pages as PageMetaDatum[])[0].path}`
