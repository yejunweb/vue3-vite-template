import type { CustomResponseData } from '@src/utils/request/types';
import { generateCustomRequestKey, generateURL } from '@src/utils/request/utils';
import axios, { type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

export const pending = new Map<string, AbortController>();

/**
 * 加入请求
 * @param {Object} config
 */
export const addPending = (config: InternalAxiosRequestConfig) => {
    const url = generateURL(config);
    const controller = new AbortController();
    if (config.cancelToken) {
        throw new Error('"cancelToken" 该语法已废弃，请使用 AbortController，https://axios-http.com/zh/docs/cancellation');
    }
    if (!config.signal) {
        config.signal = controller.signal;
        if (!pending.has(url)) {
            // 如果 pending 中不存在当前请求，则添加进去
            pending.set(url, controller);
        }
    }
};
/**
 * 移除请求
 * @param {Object} config
 */
export const removePending = (config: AxiosRequestConfig) => {
    const url = generateURL(config);
    if (pending.has(url)) {
        // 如果在 pending 中存在当前请求标识，且没有禁用，需要取消当前请求，并且移除
        pending.get(url)?.abort?.();
        pending.delete(url);
    }
};
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
    pending.forEach(cancel => cancel.abort?.());
    pending.clear();
};

export const interceptorsAutoCancel = {
    request: {
        onFulfilled: (config: InternalAxiosRequestConfig) => {
            if (config.multiple) {
                config.customRequestKey = config.customRequestKey || generateCustomRequestKey();
            } else {
                removePending(config); // 在请求开始前，对之前的请求做检查取消操作，除了配置了 multiple 的请求
            }
            addPending(config); // 将当前请求添加到 pending 中
            return config;
        },
    },
    response: {
        onFulfilled: (response: AxiosResponse<CustomResponseData>) => {
            removePending(response.config); // 在请求结束后，移除本次请求
            return response;
        },
        onRejected: (err: any) => {
            if (err?.code !== 'ERR_CANCELED') {
                removePending(err.config); // 在请求结束后，移除本次请求
            }
            throw err;
        },
    },
};
