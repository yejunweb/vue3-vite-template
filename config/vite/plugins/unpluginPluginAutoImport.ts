import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {
    AntDesignVueResolver,
    ArcoResolver,
    DevUiResolver,
    ElementPlusResolver,
    ElementUiResolver,
    HeadlessUiResolver,
    IduxResolver,
    InklineResolver,
    LayuiVueResolver,
    NaiveUiResolver,
    PrimeVueResolver,
    QuasarResolver,
    TDesignResolver,
    VantResolver,
    VarletUIResolver,
    VeuiResolver,
    ViewUiResolver,
    VueUseComponentsResolver,
    Vuetify3Resolver,
    VuetifyResolver,
} from 'unplugin-vue-components/resolvers';
import type { Plugin } from 'vite';

export const unpluginPluginAutoImport = ({ VITE_UNPLUGINS_IMPORTS }: ImportMetaEnv): Plugin[] => {
    const uis = VITE_UNPLUGINS_IMPORTS.split(',');
    const resolversMap: any = {
        AntDesign: () => [AntDesignVueResolver()],
        Arco: () => [ArcoResolver()],
        DevUi: () => [DevUiResolver()],
        ElementPlus: () => [ElementPlusResolver()],
        ElementUi: () => [ElementUiResolver()],
        HeadlessUi: () => [HeadlessUiResolver()],
        Idux: () => [IduxResolver()],
        Inkline: () => [InklineResolver()],
        LayuiVue: () => [LayuiVueResolver()],
        NaiveUi: () => [NaiveUiResolver()],
        PrimeVue: () => [PrimeVueResolver()],
        Quasar: () => [QuasarResolver()],
        TDesign: () => [TDesignResolver()],
        Vant: () => [VantResolver()],
        Varlet: () => [VarletUIResolver()],
        Veui: () => [VeuiResolver({})],
        VueUseComponents: () => [VueUseComponentsResolver()],
        Vuetify3: () => [Vuetify3Resolver()],
        Vuetify: () => [VuetifyResolver()],
        ViewUi: () => [ViewUiResolver()],
    };
    const resolvers = uis.reduce((a, b) => a.concat(resolversMap[b]?.() || []), []);
    return [
        AutoImport({
            // https://github.com/antfu/unplugin-auto-import#configuration
            resolvers,
            dts: './types/auto-imports.d.ts', // 自动生成 `auto-imports.d.ts` 文件
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
            // global imports to register
            imports: [
                // presets // 个人建议只对一些比较熟悉的API做自动导入，对于一些不大熟悉的像VueUse这种库，还是使用import更好一些，毕竟编辑器都有提示，不易写错。// eslint:vue-global-api
                'vue',
                'vue-router',
            ],
        }),
        Components({
            // https://github.com/antfu/unplugin-vue-components#configuration
            resolvers,
            dts: './types/components.d.ts', // 自动生成 `components.d.ts` 文件
            dirs: ['src/components'], // 要搜索组件的目录的相对路径
            extensions: ['vue', 'tsx', 'jsx'], // 组件的有效文件扩展名
            deep: true, // 搜索子目录
            directoryAsNamespace: false, // 允许子目录作为组件的命名空间前缀
            globalNamespaces: [], // works when `directoryAsNamespace: true`
        }),
    ];
};
