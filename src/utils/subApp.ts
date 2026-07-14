import { parseJSON } from '@src/utils';

/** 从 URL 查询参数中获取指定 key 的值 */
export function getUrlParamsByKey(key: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

/** 通过 URL 参数写入 sessionStorage，并清除地址栏中的外链参数（保留 token 等其它 query） */
export function setStoreByUrlParams() {
    const formAppName = getUrlParamsByKey('formAppName');
    if (!formAppName) return; // 非外链模式直接返回

    sessionStorage.setItem(
        'formAppInfo',
        JSON.stringify({
            formAppName,
            targetMapId: getUrlParamsByKey('targetMapId'),
        })
    );

    const url = new URL(window.location.href);
    url.searchParams.delete('formAppName');
    url.searchParams.delete('targetMapId');
    // 移除 URL 参数
    window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
}

/** 获取外部应用传递的来源信息（优先 sessionStorage，回退 URL 参数） */
export function getFormAppInfo() {
    const { formAppName, targetMapId } = parseJSON(sessionStorage.getItem('formAppInfo') || '{}');
    return {
        formAppName: formAppName || getUrlParamsByKey('formAppName'),
        targetMapId: targetMapId || getUrlParamsByKey('targetMapId'),
    };
}

/** 是否来自「微观E家」桌面端（Electron 环境） */
export function isFromCrmFamily() {
    return getFormAppInfo()?.formAppName === 'crmFamily' && !!(window as any).ipcRenderer;
}

/** 是否来自「微观世界」手机端 */
export function isFromCrmMobile() {
    return getFormAppInfo()?.formAppName === 'crmMobile';
}
