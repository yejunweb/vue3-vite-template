<script lang="ts" setup>
import dayjs from 'dayjs';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { ConfigProvider } from 'ant-design-vue';
import { useStoreSetting } from '@src/store/modules/setting';
import 'dayjs/locale/zh-cn';

useStoreSetting();
dayjs.locale('zh-cn');
const colorMater = computed(() => useStoreSetting().theme['--color-master']);
</script>

<template>
    <ConfigProvider
        :locale="zhCN"
        :theme="{
            token: {
                colorPrimary: colorMater,
            },
        }"
    >
        <RouterView v-slot="{ Component }">
            <Transition name="scale-base" mode="out-in">
                <component :is="Component" />
            </Transition>
        </RouterView>
    </ConfigProvider>
</template>
