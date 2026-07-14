import { cloneDeep } from 'lodash-es';

export interface Configs<Params, Data> {
    autoRequest?: boolean;
    defaultData?: Data;
    defaultParams?: Params;
    dataReslove?: (arg: Data) => Data;
}

export const useRequest = <T extends (params: any) => Promise<any>, Params = Parameters<T>[0], Data = Awaited<ReturnType<T>>['data']>(
    apiFunc: T,
    configs?: Configs<Params, Data>
) => {
    const { autoRequest, defaultData, defaultParams, dataReslove } = Object.assign({ autoRequest: true }, configs);

    const result = ref<Data>();
    const loading = ref(false);

    // 默认值赋值
    result.value = cloneDeep(defaultData);

    const run = async (params?: Params): Promise<Data> => {
        loading.value = true;
        const { data } = await apiFunc({
            ...defaultParams,
            ...params,
        }).finally(() => {
            loading.value = false;
        });
        result.value = dataReslove ? dataReslove(data) : data;
        return data;
    };

    // 自动请求
    autoRequest && run();

    return {
        run,
        result,
        loading,
    };
};
