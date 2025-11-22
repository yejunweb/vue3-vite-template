<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { CommonUtil, useMessage } from 'wot-design-uni'
import { getLastPage } from '@/utils/index'

defineOptions({
    virtualHost: true, // 虚拟节点
    addGlobalClass: true, // 支持全局样式
    styleIsolation: 'shared', // 样式隔离共享
})

const { messageOptions, currentPage } = storeToRefs(useGlobalMessage())

const messageBox = useMessage('wgGlobalMessage')
const currentPath = getLastPage().route || ''

watch(() => messageOptions.value, (newVal) => {
    if (newVal) {
        if (currentPage.value === currentPath) {
            const option = CommonUtil.deepClone(newVal)
            messageBox.show(option).then((res) => {
                if (CommonUtil.isFunction(option.success)) {
                    option.success(res)
                }
            }).catch((err) => {
                if (CommonUtil.isFunction(option.fail)) {
                    option.fail(err)
                }
            })
        }
    }
    else {
        messageBox.close()
    }
})
</script>

<template>
    <wd-message-box :custom-class="messageOptions.customClass || 'wg-global-message'" selector="wgGlobalMessage" />
</template>

<style lang="scss">
.wg-global-message {
    width: 500rpx !important;

    .wd-message-box__body {
        padding: $space5 $space4 $space4;
    }

    .wd-message-box__title {
        color: #2a3036;
        font-size: 34rpx;
        font-weight: normal;
        line-height: $space6;
        padding: 0;
        margin-bottom: $space2;
    }

    .wd-message-box__content {
        color: #2b2e33;
        font-size: 28rpx;
        line-height: $space5;
    }

    .wd-message-box__actions {
        padding: 0;
        border-top: 1px solid #e9e9e9;

        > .wd-button {
            flex: 1;
            margin: 0;
            height: 82rpx;
            line-height: 82rpx;
            border-radius: unset;
            color: #2a3036;
            font-size: 28rpx;
            background-color: #fff;
            border: unset;

            &.is-primary {
                color: var(--wot-color-theme);
            }

            & + .wd-button {
                border-left: 1px solid #e9e9e9;
            }
        }
    }
}
</style>
