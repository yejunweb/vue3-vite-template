import axios, { type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { router } from '@src/router';
import { useStoreUser } from '@src/store/modules/user';
import type { CustomAxiosResponseData, CustomResponseData } from '@src/utils/request/types';
import { generateCustomRequestKey } from '@src/utils/request/utils';
import { interceptorsAutoCancel, removePending, clearPending } from '@src/utils/request/interceptors/autoCancel';
import { interceptorsAuth } from '@src/utils/request/interceptors/auth';

const _request = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 120 * 1000,
});

// warning: 类型和下面的 interceptors.response 耦合，这里忽略 ts 检查
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore responseType
export const request = <T>(config: AxiosRequestConfig): CustomAxiosResponseData<T> => _request(config);

export const requestDelay = <T>(axiosRequestConfig: AxiosRequestConfig) => {
    const customRequestKey = generateCustomRequestKey();
    const config = { ...axiosRequestConfig, isDelayRequest: true, ...(axiosRequestConfig.multiple ? { customRequestKey } : undefined) };
    return {
        customRequestKey,
        requestStart: () => request<T>(config),
        requestCancel: () => removePending(config),
    };
};

_request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    err => {
        alert('客户端网络错误');
        throw err;
    }
);
_request.interceptors.request.use(interceptorsAuth.request.onFulfilled);
_request.interceptors.request.use(interceptorsAutoCancel.request.onFulfilled);

_request.interceptors.response.use(interceptorsAutoCancel.response.onFulfilled, interceptorsAutoCancel.response.onRejected);
_request.interceptors.response.use(
    (response: AxiosResponse<CustomResponseData>): any => {
        const storeUser = useStoreUser();
        const data = response.data;
        if (data.code === 200) {
            return data;
        } else if (data.code === 400401) {
            storeUser.clearAuth();
            router.replace({ name: 'Error', query: { type: '403' } });
            return data;
        } else {
            console.error('😭😭😭', response);
            if (!response.config.hideErrorToast) alert(data.message || '出错了');
            throw data;
        }
    },
    err => {
        if (err?.code === 'ECONNABORTED') alert('网络超时，请稍后重试！');
        else if (err?.code === 'ERR_NETWORK') alert('貌似断网了喔~~');
        else if (err?.code === 'ERR_CANCELED') throw new Error('💩💩💩请求已取消');
        else alert(err?.message || '服务器开小差了，请刷新重试');
        throw err;
    }
);

export { clearPending };
