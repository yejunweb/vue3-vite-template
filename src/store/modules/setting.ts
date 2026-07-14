import { onMounted } from 'vue';
import { camelCase } from 'lodash-es';
import { defineStore } from 'pinia';
import { ConfigProvider } from 'ant-design-vue';
import { useLocalStorage } from '@src/utils/storage';
import insertCss from '@src/utils/insertCss';

const initTheme = {
    // 更改初始值如果发现没有生效，请清空 LocalStorage
    '--color-master-dark-1': '#0886fa',
    '--color-master': '#3370ff',
    '--color-master-light-1': '#2995f8',
    '--color-master-light-2': '#63aff3',
    '--color-master-light-3': '#90c6f6',
    '--color-master-light-4': '#e6f7ff',
    '--color-success': '#67c23a',
    '--color-error': '#f56c6c',
    '--color-warning': '#faad14',
    '--color-info': '#3370ff',
    '--font-color-1': '#333',
    '--font-color-2': '#666',
    '--font-color-3': '#999',
    '--font-color-4': '#ccc',
    '--font-color-link': '#576b95',
    '--font-size-base': '14px',
    '--font-size-footnote': 'calc(var(--font-size-base) - 4px)', // 10px
    '--font-size-tips': 'calc(var(--font-size-base) - 2px)', // 12px
    '--font-size-content': 'var(--font-size-base)', // 14px
    '--font-size-subtitle': 'calc(var(--font-size-base) + 2px)', // 16px
    '--font-size-title': 'calc(var(--font-size-base) + 4px)', // 18px
    '--font-size-headline': 'calc(var(--font-size-base) + 6px)', // 20px
    '--border-color': '#f0f0f0',
    '--background-color': '#f5f7fa',
    '--base-space': '4px',
};

// 设置样式变量
const setCssVariable = (data: { [key: string]: string }): void => {
    insertCss(
        `
:root {
${Object.keys(data)
    .map(key => {
        return `${key}: ${data[key]};\n`;
    })
    .join('')}
}`,
        {
            replace: true,
            prepend: true,
        }
    );
};

export const useStoreSetting = defineStore('settings', () => {
    const theme = useLocalStorage('theme', { ...initTheme });

    const setTheme = (data: { [key: string]: string }): void => {
        theme.value = { ...theme.value, ...data };
        // 如果是需要改变 ant 的主题色，需要调用 ConfigProvider.config
        const themeColors: { [key: string]: string } = {
            '--color-master': '--ant-primary-color',
            '--color-success': '--ant-success-color',
            '--color-error': '--ant-error-color',
            '--color-warning': '--ant-warning-color',
            '--color-info': '--ant-info-color',
        };
        const configColor: string[] = Object.keys(themeColors) as string[];
        if (configColor.find(v => Object.keys(data).includes(v))) {
            ConfigProvider.config({
                theme: Object.keys(theme.value)
                    .filter(v => configColor.includes(v))
                    .reduce((res: any, key) => (res[camelCase(themeColors[key].replace('ant', ''))] = theme.value[key]) && res, {}),
            });
        }
        setCssVariable(theme.value);
    };

    onMounted(() => {
        setTheme(theme.value);
    });

    return {
        theme,
        setTheme,
    };
});
