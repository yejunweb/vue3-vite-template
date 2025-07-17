import vueJsx from '@vitejs/plugin-vue-jsx';
import { isCustomElement } from '../../utils';

export const officialPluginVueJsx = () =>
    vueJsx({
        isCustomElement,
    });
