import { useStoreUser } from '@src/store/modules/user';
import type { InternalAxiosRequestConfig } from 'axios';

export const interceptorsAuth = {
    request: {
        onFulfilled: (config: InternalAxiosRequestConfig) => {
            const { token, ...restParams } = useStoreUser().auth;
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
                config.params = { ...restParams, ...config.params };
            }
            return config;
        },
    },
};
