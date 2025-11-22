import type { RemovableRef, UseStorageOptions } from '@vueuse/core'
import type { WritableComputedRef } from 'vue'
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

// 兼容 uni.storage
export const uniStorage = {
    getItem(key: string) {
        return uni.getStorageSync(key) || null
    },
    setItem(key: string, value: any) {
        return uni.setStorageSync(key, value)
    },
    removeItem(key: string) {
        return uni.removeStorageSync(key)
    },
}

export const createStore = (key = 'please-assign-value') => {
    const options: UseStorageOptions<any> = {}
    options.serializer = {
        read: (v: any) => (v ? JSON.parse(v) : null),
        write: (v: any) => JSON.stringify(v),
    }
    const storeLocalStorage = useStorage<any>(key, {}, uniStorage, options)

    const getStore = <T>(storeKey: string, initialValue: T, store: RemovableRef<any>) => {
        store.value = store.value || {}
        store.value[storeKey] = store.value[storeKey] || initialValue
        return computed({
            get: () => store.value[storeKey],
            set: (val) => {
                store.value[storeKey] = val
            },
        })
    }
    return {
        useUniStorage: <T>(key: string, initialValue: T): WritableComputedRef<T> => getStore<T>(key, initialValue, storeLocalStorage),
    }
}

export const { useUniStorage } = createStore(import.meta.env.VITE_APP_STORAGE_KEY)
