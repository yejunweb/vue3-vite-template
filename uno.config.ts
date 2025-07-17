import { defineConfig, presetUno, presetAttributify, presetIcons, presetTypography } from 'unocss';

export default defineConfig({
    // https://unocss.dev/presets/attributify
    presets: [
        presetUno({
            prefix: 'g-',
            corePlugins: {
                preflight: false,
            },
            content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
        }),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
    ],
    // https://unocss.dev/config/rules
    rules: [],
    // https://unocss.dev/config/shortcuts
    shortcuts: {
        'border-base': 'border-solid dark:border-white/9 border-[#EFEFF5] border-1',
        'rounded-base': 'rounded-[var(--border-radius)]',
        'bg-base': 'dark:bg-#18181c bg-white',
        'text-base': 'dark:text-white/82',
        'page-wrapper': 'p16 w-full',
    },
    theme: {
        colors: {
            primary: 'var(--color-master)',
            'text-color': 'var(--color-text)',
        },
    },
});
