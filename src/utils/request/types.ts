import type { AxiosResponse } from 'axios';

export interface CustomResponseData<T = unknown> {
    message: string;
    code: number;
    data: T;
}

export type CustomAxiosResponseData<T> = Promise<AxiosResponse<CustomResponseData<T>>['data']>;
