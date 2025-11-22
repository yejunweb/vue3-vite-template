<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useToast } from 'wot-design-uni'
import { getLastPage } from '@/utils/index'

defineOptions({
    virtualHost: true, // 虚拟节点
    addGlobalClass: true, // 支持全局样式
    styleIsolation: 'shared', // 样式隔离共享
})

const { toastOptions, currentPage } = storeToRefs(useGlobalToast())

const { close: closeGlobalToast } = useGlobalToast()

const toast = useToast('wgGlobalToast')
const currentPath = getLastPage().route || ''

watch(() => toastOptions.value, (newVal) => {
    if (newVal && newVal.show) {
        if (currentPage.value === currentPath) {
            toast.show(toastOptions.value)
        }
    }
    else {
        toast.close()
    }
})
</script>

<template>
    <wd-toast selector="wgGlobalToast" :closed="closeGlobalToast" />
</template>
