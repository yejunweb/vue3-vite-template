<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'ant-design-vue';

defineOptions({ name: 'HelloWorld' });

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
    <div class="hello-world">
        <h1>{{ msg }}</h1>

        <p>
            Recommended IDE setup:
            <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
            +
            <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
        </p>

        <p>See <code>README.md</code> for more information.</p>

        <p>
            <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
            |
            <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
        </p>
        <Button @click="count++">count is: {{ count }}</Button>
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test hot module replacement.
        </p>
    </div>
</template>

<style scoped lang="scss">
.hello-world {
    a {
        color: #42b983;
    }

    code {
        padding: 2px 4px;
        color: #304455;
        background-color: #eee;
        border-radius: 4px;
    }
}
</style>
