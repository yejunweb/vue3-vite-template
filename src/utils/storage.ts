import { computed } from 'vue';
import type { WritableComputedRef } from 'vue';
import { useStorage } from '@vueuse/core';
import type { UseStorageOptions, RemovableRef } from '@vueuse/core';
import { isDevMode } from '@src/utils';
import CryptoJS from 'crypto-js';

interface Option<T> extends UseStorageOptions<T> {
    crypto?: boolean;
}

export const decrypt = (data: any, storeKey: string) => {
    const key = CryptoJS.MD5(storeKey).toString();
    const iv = key.substring(0, 16);

    const decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
};

export const encrypt = (data: any, storeKey: string) => {
    const key = CryptoJS.MD5(storeKey).toString();
    const iv = key.substring(0, 16);

    const content = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(content, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
};

export function createStore(key = 'please-assign-value', initOptions?: Option<any>) {
    const options: Option<any> = initOptions || {};
    if (options?.crypto) {
        options.serializer = {
            read: (v: any) => (v ? JSON.parse(decrypt(v, key)) : null),
            write: (v: any) => encrypt(JSON.stringify(v), key),
        };
    }
    const storeLocalStorage = useStorage<any>(key, {}, window?.localStorage, options);
    const storeSessionStorage = useStorage<any>(key, {}, window?.sessionStorage, options);

    const getStore = <T>(storeKey: string, initialValue: T, store: RemovableRef<any>) => {
        store.value = store.value || {};
        store.value[storeKey] = store.value[storeKey] || initialValue;
        return computed({
            get: () => store.value[storeKey],
            set: val => {
                store.value[storeKey] = val;
            },
        });
    };
    return {
        useLocalStorage: <T>(key: string, initialValue: T): WritableComputedRef<T> => getStore<T>(key, initialValue, storeLocalStorage),
        useSessionStorage: <T>(key: string, initialValue: T): WritableComputedRef<T> => getStore<T>(key, initialValue, storeSessionStorage),
    };
}

export const { useLocalStorage, useSessionStorage } = createStore(import.meta.env.VITE_APP_STORAGE_KEY, { crypto: !isDevMode() });
