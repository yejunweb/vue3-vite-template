import { defineStore } from 'pinia';
import { useLocalStorage } from '@src/utils/storage';
import { getCookie, isDevMode } from '@src/utils';
import { isFromCrmFamily, isFromCrmMobile } from '@src/utils/subApp';

export const useStoreUser = defineStore('user', () => {
    const auth = useLocalStorage('auth', {
        token: '',
    });
    const user = ref<Partial<any>>({});

    const setAuth = ({ token }: { token: string }) => {
        if (token && token !== auth.value.token) auth.value.token = token;
    };

    /** 生产环境从 cookie 恢复 token（开发环境走 URL query） */
    const bootstrapAuth = () => {
        if (isDevMode()) return;
        const token = getCookie('token');
        if (token) setAuth({ token });
    };

    const getUser = async () => {
        // 调用并设置用户信息
    };

    const logout = async ({ useApiLogout = true } = {}) => {
        try {
            /* 接入微观E家：子应用退出登录时、通过参数传递通知父应用，由父应用操作登出事件 */
            if (isFromCrmFamily()) return (window as any).ipcRenderer?.send('subApp:logout', { subAppName: 'LITE_MAP' });
            /* 接入微观世界：子应用退出登录时、通过参数传递通知父应用，由父应用操作登出事件 */
            if (isFromCrmMobile()) return window.parent.postMessage({ type: 'subApp.logout' }, '*');

            if (useApiLogout && auth.value.token) {
                // 调用登出接口
            }
        } finally {
            // 清空用户认证信息
            auth.value = {
                token: '',
            };
            user.value = {};

            // 延迟跳转到登录页
            setTimeout(() => {
                window.location.reload();
            }, 800);
        }
    };

    return {
        auth,
        user,
        setAuth,
        bootstrapAuth,
        getUser,
        logout,
    };
});
