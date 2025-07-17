import type { defineComponent } from 'vue';
import { createApp, getCurrentInstance } from 'vue';

export const mountComponent = (RootComponent: ReturnType<typeof defineComponent>) => {
    const app = createApp(RootComponent);
    const root = document.createElement('div');
    document.body.appendChild(root);
    return {
        instance: app.mount(root),
        unmount() {
            app.unmount();
            document.body.removeChild(root);
        },
    };
};

export const useExpose = (apis: Record<string, any>) => {
    const instance = getCurrentInstance();
    if (instance) {
        Object.assign(instance.proxy || {}, apis);
    }
};
