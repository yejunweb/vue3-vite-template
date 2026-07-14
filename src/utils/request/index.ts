import { message } from 'ant-design-vue';
import { MessageBox } from '@src/components/MessageBox';
import axios, { type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { useStoreUser } from '@src/store/modules/user';
import type { CustomAxiosResponseData, CustomResponseData } from '@src/utils/request/types';
import { generateCustomRequestKey } from '@src/utils/request/utils';
import { interceptorsAutoCancel, removePending, clearPending } from '@src/utils/request/interceptors/autoCancel';
import { interceptorsAuth } from '@src/utils/request/interceptors/auth';
import { isDevMode } from '@src/utils';

const _request = axios.create({
    baseURL: isDevMode() ? import.meta.env.VITE_APP_API_URL_PROXY ?? import.meta.env.VITE_APP_API_URL : import.meta.env.VITE_APP_API_URL,
    timeout: 120 * 1000,
    withCredentials: true, // 允许携带 cookie
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
        message.error('客户端网络错误');
        throw err;
    }
);
_request.interceptors.request.use(interceptorsAuth.request.onFulfilled);
_request.interceptors.request.use(interceptorsAutoCancel.request.onFulfilled);

_request.interceptors.response.use(interceptorsAutoCancel.response.onFulfilled, interceptorsAutoCancel.response.onRejected);
_request.interceptors.response.use(
    (response: AxiosResponse<CustomResponseData>): any => {
        const data = response.data;
        const code = Number(data.code);
        if (data instanceof Blob) {
            return response;
        } else if ([0, 200].includes(code)) {
            return data;
        } else if (code === 401) {
            MessageBox({
                title: '登录',
                content: '无权限或登录失效，请重新登录',
                okText: '重新登录',
            }).finally(() => {
                const storeUser = useStoreUser();
                storeUser.logout({ useApiLogout: false });
            });
        } else {
            console.error('😭😭😭', response);
            if (!response.config.hideErrorToast) message.error(data.message || data.msg || '出错了');
            throw data;
        }
    },
    err => {
        if (err?.code === 'ECONNABORTED') message.error('网络超时，请稍后重试！');
        else if (err?.code === 'ERR_NETWORK') message.error('貌似断网了喔~~');
        else if (err?.code === 'ERR_CANCELED') throw new Error('💩💩💩请求已取消');
        else message.error(err?.message || '服务器开小差了，请刷新重试');
        throw err;
    }
);

export { clearPending };
