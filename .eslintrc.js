/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier/skip-formatting', '@unocss'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    ignorePatterns: ['index.html', 'public/**/*', 'dist/**/*'],
    rules: {
        'space-before-function-paren': 'off',
        'vue/attributes-order': 'off',
        'vue/one-component-per-file': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        'no-unused-vars': 'off',
        'vue/component-name-in-template-casing': [
            'error',
            'PascalCase',
            {
                registeredComponentsOnly: false,
                ignores: [],
            },
        ],
        'vue/component-tags-order': [
            'error',
            {
                order: ['script', 'template', 'style'], // vue3 推荐顺序
            },
        ],
        'vue/valid-v-model': 'warn',
        'vue/no-setup-props-destructure': 'warn',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-empty-interface': 'warn',
        complexity: ['error', 18],
    },
};
