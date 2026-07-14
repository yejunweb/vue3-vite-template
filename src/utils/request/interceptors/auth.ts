import { useStoreUser } from '@src/store/modules/user';
import type { InternalAxiosRequestConfig } from 'axios';
import { isMobile } from '@src/utils/index';

export const interceptorsAuth = {
    request: {
        onFulfilled: (config: InternalAxiosRequestConfig) => {
            const { token } = useStoreUser().auth;
            if (token) config.headers.Authorization = 'Bearer ' + token;
            config.headers.Platform = isMobile() ? 'Mobile' : 'PC';
            return config;
        },
    },
};
