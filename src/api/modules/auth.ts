import { request } from '@src/utils/request';

export const getUser = () =>
    request<{ name: string; age: number }>({
        url: '/admin/getmemberinfo',
        method: 'post',
        multiple: false,
    });
