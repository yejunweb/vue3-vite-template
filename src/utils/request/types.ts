import type { AxiosResponse } from 'axios';

export interface CustomResponseBase {
    message?: string;
    msg?: string;
    code: number | string;
}

export interface CustomResponseData<T = unknown> extends CustomResponseBase {
    data: T;
}

/**
 * 根据传入的泛型类型推断返回类型
 * 如果 T 已经包含 msg 和 code，则直接使用 AxiosResponse<T>、否则使用 CustomResponseData<T>
 */
export type CustomAxiosResponseData<T> = T extends CustomResponseBase
    ? Promise<AxiosResponse<T>['data']>
    : Promise<AxiosResponse<CustomResponseData<T>>['data']>;
