<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@src/views/Demo/components/HelloWorld.vue';
import Empty from '@src/components/Empty/index.vue';

export default defineComponent({
    name: 'Normal',
    components: { HelloWorld, Empty },
    setup() {
        return {
            msg: import.meta.env.VITE_APP_TITLE,
            click: () => alert('click'),
        };
    },
});
</script>

<template>
    <Empty />
    <p class="g-flex g-items-center g-color-orange-500">JSXInSetup2</p>
    <button @click="click">click!</button>
    <HelloWorld :msg="msg" />
</template>

<style lang="scss" scoped>
p {
    background-color: red;
}
</style>
