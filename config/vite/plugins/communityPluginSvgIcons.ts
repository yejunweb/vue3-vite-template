import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'node:path';

export const communityPluginSvgIcons = (isBuild: boolean) =>
    createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: isBuild,
    });
