import vue from '@vitejs/plugin-vue';
import { isCustomElement } from '../../utils';

export const officialPluginVue = () =>
    vue({
        template: {
            compilerOptions: {
                isCustomElement,
            },
        },
    });
