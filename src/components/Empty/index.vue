<script setup lang="ts">
import SvgIcon from '@src/components/SvgIcon';

const props = withDefaults(
    defineProps<{
        description?: string;
    }>(),
    {
        description: '暂无数据',
    }
);
defineOptions({ name: 'Empty' });
</script>

<template>
    <div class="empty">
        <SvgIcon name="empty" />
        <p class="empty-description">{{ props.description }}</p>
    </div>
</template>

<style scoped lang="scss">
.empty {
    padding: 50px 0;
    font-size: 100px;
    text-align: center;

    &-description {
        margin-top: 0.3em;
        font-size: 14px;
        color: #999;
    }
}
</style>
