import type { AxiosRequestConfig } from 'axios';

export const generateCustomRequestKey = () => '' + Date.now() + Math.random();

export const generateURL = (config: AxiosRequestConfig) =>
    config && [config.method, config.url?.replace(import.meta.env.VITE_APP_API_URL, ''), config.customRequestKey].filter(Boolean).join('&');
