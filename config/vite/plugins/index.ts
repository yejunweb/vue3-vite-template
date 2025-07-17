import type { ConfigEnv, Plugin } from 'vite';
import { officialPluginVue } from './officialPluginVue';
import { officialPluginVueJsx } from './officialPluginVueJsx';
import { officialPluginLegacy } from './officialPluginLegacy';
import { communityPluginEnvTypes } from './communityPluginEnvTypes';
import { unoCSSPluginUnoCSS } from './unoCSSPluginUnoCSS';
import { unpluginPluginAutoImport } from './unpluginPluginAutoImport';
import { rollupPluginVisualizer } from './rollupPluginVisualizer';
import { officialPluginInspect } from './officialPluginInspect';
import { communityPluginCompression2 } from './communityPluginCompression2';
import { communityPluginCertificate } from './communityPluginCertificate';
import { communityPluginSvgIcons } from './communityPluginSvgIcons';
import { communityPluginElectron } from './communityPluginElectron';
import { communityPluginElectronRenderer } from './communityPluginElectronRenderer';
import { isEnvTrue } from '../../utils';

export const createVitePlugins = ({ command }: ConfigEnv, viteEnv: ImportMetaEnv) => {
    const isBuild = command === 'build';
    const { VITE_LEGACY, VITE_LISTEN_HTTPS, VITE_UNPLUGINS_IMPORTS, VITE_USE_ELECTRON } = viteEnv;
    const lifecycle = process.env.npm_lifecycle_event;
    // https://github.com/vitejs/awesome-vite#plugins
    // vite-plugin-pages // 自动根据目录生成路由
    const plugins: (Plugin | Plugin[])[] = [
        officialPluginVue(),
        officialPluginVueJsx(),
        communityPluginEnvTypes(),
        unoCSSPluginUnoCSS(),
        officialPluginInspect(),
        communityPluginSvgIcons(isBuild),
    ];

    if (VITE_UNPLUGINS_IMPORTS) plugins.push(...unpluginPluginAutoImport(viteEnv));

    if (isEnvTrue(VITE_USE_ELECTRON)) plugins.push(communityPluginElectron(), communityPluginElectronRenderer());

    if (isEnvTrue(VITE_LISTEN_HTTPS)) plugins.push(communityPluginCertificate());

    if (isEnvTrue(VITE_LEGACY)) plugins.push(officialPluginLegacy());

    if (lifecycle === 'report') {
        plugins.push(rollupPluginVisualizer());
    }

    if (isBuild) {
        plugins.push(...communityPluginCompression2(viteEnv));
    }
    return plugins;
};
