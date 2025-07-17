import axios from 'axios';

declare module 'axios' {
    interface ExtraRequestConfig {
        multiple?: boolean; // 是否可以进行多次请求
        customRequestKey?: string; // 请求的唯一 key
        hideErrorToast?: boolean;
    }

    interface InternalAxiosRequestConfig extends ExtraRequestConfig {}
    interface AxiosRequestConfig extends ExtraRequestConfig {}
}
