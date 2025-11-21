<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useToast } from 'wot-design-uni'
import { getLastPage } from '@/utils/index'

defineOptions({
    virtualHost: true, // 虚拟节点
    addGlobalClass: true, // 支持全局样式
    styleIsolation: 'shared', // 样式隔离共享
})

const { loadingOptions, currentPage } = storeToRefs(useGlobalLoading())

const { close: closeGlobalLoading } = useGlobalLoading()

const loading = useToast('globalLoading')
const currentPath = getLastPage().route || ''

watch(() => loadingOptions.value, (newVal) => {
    if (newVal && newVal.show) {
        if (currentPage.value === currentPath) {
            loading.loading(loadingOptions.value)
        }
    }
    else {
        loading.close()
    }
})
</script>

<template>
    <wd-toast selector="globalLoading" :closed="closeGlobalLoading" />
</template>
