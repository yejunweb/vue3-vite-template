import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useLocalStorage, useSessionStorage } from '@src/utils/storage';

export const useStoreUser = defineStore('user', () => {
    const name = ref(window.localStorage.getItem('token') || 'from pinia userName');
    const nickname = ref('from pinia nickname');
    const auth = useLocalStorage('auth', {
        token: '',
        org_id: '',
        system_code: '',
        name: '',
        license: '',
    });
    const setAuth = (query: any) => {
        const { token, system_code, org_id } = query;
        if (token && token !== auth.value.token) auth.value.token = token;
        if (org_id && org_id !== auth.value.org_id) auth.value.org_id = org_id;
        if (system_code && system_code !== auth.value.system_code) auth.value.system_code = system_code;
    };

    const clearAuth = () => {
        auth.value = {
            token: '',
            org_id: '',
            system_code: '',
            name: '',
            license: '',
        };
    };
    const fullName = computed(() => name.value + nickname.value);
    const changeName = () => {
        name.value = 'changeName userName';
    };
    const countInLocalStorage = useLocalStorage('countInLocalStorage', 1);
    const countInSessionStorage = useSessionStorage('countInSessionStorage', 1);
    const changeLocalStorageCount = () => (countInLocalStorage.value = countInLocalStorage.value + 1);
    const changeSessionStorage = () => (countInSessionStorage.value = countInSessionStorage.value + 1);
    return {
        name,
        auth,
        setAuth,
        clearAuth,
        nickname,
        fullName,
        changeName,
        countInLocalStorage,
        changeLocalStorageCount,
        countInSessionStorage,
        changeSessionStorage,
    };
});
