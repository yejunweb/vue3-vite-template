import CryptoJS from 'crypto-js';
import { attempt, isError, floor } from 'lodash-es';

/** 解析本地 assets 目录下的静态资源 URL */
export const getImageUrl = (path: string) => new URL(`../assets/${path}`, import.meta.url).href;

/** 拼接 OSS 资源完整地址 */
export const getOSSUrl = (path: string): string => 'https://oss.example.com/' + path;

/** 当前 Vite 运行模式（development / production / staging 等） */
export const getEnv = (): string => import.meta.env.MODE;

/** 是否为开发模式 */
export const isDevMode = (): boolean => import.meta.env.DEV;

/** 是否为构建产物模式（含 staging） */
export const isBuildMode = (): boolean => import.meta.env.PROD;

/** 是否为 staging 环境 */
export const isStageMode = (): boolean => getEnv().includes('staging');

/** 是否为正式生产环境（排除 staging） */
export const isProdMode = (): boolean => import.meta.env.PROD && !isStageMode();

/** 生成 UUID v4，兼容不支持 crypto.randomUUID 的环境 */
export const randomUUID = (): string => {
    const hex = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-${((parseInt(hex[16], 16) & 0x3) | 0x8).toString(16)}${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
};

/** 安全解析 JSON，失败时返回空对象 */
export const parseJSON = (json: string) => {
    const parsedData = attempt(JSON.parse, json);
    if (!isError(parsedData)) {
        return parsedData;
    } else {
        return {};
    }
};

/** kebab-case 转 PascalCase，如 foo-bar → FooBar */
export const kebabToPascal = (str: string) =>
    str
        .split('-')
        .map(word => (word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ''))
        .join('');

/** PascalCase 转 kebab-case，如 FooBar → foo-bar */
export const pascalToKebab = (str: string) => str && str.replace(/\B([A-Z])/g, '-$1').toLowerCase();

/**
 * 数字单位转换
 * @returns [数值, 单位名]，数值小于目标单位时单位名为空字符串
 */
export const unitTransform = (num: number, targetUnit: '千' | '万' | '十万' | '百万' = '万'): [number, string] => {
    const unitMap = {
        千: { value: 1000, name: '千' },
        万: { value: 10000, name: '万' },
        十万: { value: 100000, name: '十万' },
        百万: { value: 1000000, name: '百万' },
    };

    const { value, name } = unitMap[targetUnit];
    if (num < value) return [num, ''];
    return [floor(num / value, 2), name];
};

/** 浏览器 / 运行环境检测结果 */
export type BrowserEnv = {
    /** 是否为移动终端（含 iPad 桌面 UA） */
    mobile: boolean;
    /** 是否为 iOS（含 iPad） */
    ios: boolean;
    /** 是否为 Android */
    android: boolean;
    /** 是否为 iPhone */
    iphone: boolean;
    /** 是否为 iPad（含 iPadOS 13+ 桌面 UA） */
    ipad: boolean;
    /** 是否在微信内置浏览器中 */
    wechat: boolean;
    /** 是否在微信小程序 web-view 中 */
    wechatMini: boolean;
};

let cachedBrowsers: BrowserEnv | null = null;

/** 解析 UA，兼容非浏览器环境 */
const detectBrowsers = (): BrowserEnv => {
    const u = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    // iPadOS 13+ 可能伪装为 Mac，需结合触控点数判断
    const ipad = /iPad/i.test(u) || (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    return {
        mobile: /AppleWebKit.*Mobile|Android|iPhone|iPod|Windows Phone/i.test(u) || ipad,
        ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(u) || ipad,
        android: /Android/i.test(u),
        iphone: /iPhone/i.test(u),
        ipad,
        wechat: /micromessenger/i.test(u),
        wechatMini:
            /miniprogram\/wx/i.test(u) ||
            (typeof window !== 'undefined' && (window as Window & { __wxjs_environment?: string }).__wxjs_environment === 'miniprogram'),
    };
};

/** 检测运行环境（移动端 / 微信 / 小程序等），结果缓存 */
export const getBrowsers = (): BrowserEnv => cachedBrowsers ?? (cachedBrowsers = detectBrowsers());

/** 是否为移动终端 */
export const isMobile = (): boolean => getBrowsers().mobile;

/** 获取 cookie */
export function getCookie(name: string) {
    const cookieArray = document.cookie.split('; ');
    let cookieValue = null;

    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i];
        if (cookie.startsWith(name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
    }

    return cookieValue;
}
