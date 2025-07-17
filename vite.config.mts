import { type UserConfig, type ConfigEnv, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { createVitePlugins } from './config/vite/plugins';
import { isEnvTrue } from './config/utils';

const envDir = fileURLToPath(new URL('env', import.meta.url));
const srcDir = fileURLToPath(new URL('./src', import.meta.url));
// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfig => {
    const viteEnv = loadEnv(configEnv.mode, envDir) as ImportMetaEnv;
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_DROP_DEBUG } = viteEnv;
    return {
        base: VITE_PUBLIC_PATH,
        envDir,
        root: process.cwd(),
        plugins: createVitePlugins(configEnv, viteEnv),
        resolve: {
            alias: {
                '@': srcDir,
                '@src': srcDir,
            },
        },
        esbuild: {
            pure: [isEnvTrue(VITE_DROP_CONSOLE) && 'console.log', isEnvTrue(VITE_DROP_DEBUG) && 'debugger'].filter(Boolean) as string[],
            exclude: [],
        },
        build: {
            target: 'es2015',
            cssTarget: 'chrome80',
            modulePreload: {
                polyfill: true,
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖 https://rollupjs.org/guide/en/#big-list-of-options
                external: [],
                // 静态资源分类打包
                output: {
                    manualChunks: {
                        // 'monaco-editor': ['monaco-editor'],
                        // 'naive-ui': ['naive-ui'],
                        echarts: ['echarts'],
                        'vue-vendor': ['vue', 'vue-router', 'pinia'],
                        util: ['@vueuse/core'],
                    },
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    assetFileNames: '[ext]/[name]-[hash].[ext]',
                },
            },
        },
        server: {
            port: parseInt(VITE_PORT),
            host: true,
            // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
            proxy: {},
        },
    };
};
