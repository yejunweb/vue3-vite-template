/* eslint-env node */
module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss', 'stylelint-config-recommended-vue', 'stylelint-config-recess-order'],
    plugins: ['stylelint-prettier', 'stylelint-scss'],
    overrides: [
        {
            files: ['**/*.{vue,html,css}'],
            customSyntax: 'postcss-html',
        },
    ],
    rules: {
        'prettier/prettier': true,
        'no-descending-specificity': null,
        'selector-not-notation': null,
        'import-notation': null,
        'function-no-unknown': null,
        'selector-class-pattern': null,
        'property-no-unknown': [
            true,
            {
                ignoreSelectors: [':export'],
            },
        ],
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['deep', 'global', 'export'],
            },
        ],
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
            },
        ],
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'function', 'if', 'each', 'include', 'mixin', 'extend', 'use'],
            },
        ],
        'no-empty-source': null,
        'named-grid-areas-no-invalid': null,
        'font-family-no-missing-generic-family-keyword': null,
        'rule-empty-line-before': [
            'always',
            {
                ignore: ['after-comment', 'first-nested'],
            },
        ],
        'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
        'order/order': [
            [
                'dollar-variables',
                'custom-properties',
                'at-rules',
                'declarations',
                {
                    type: 'at-rule',
                    name: 'supports',
                },
                {
                    type: 'at-rule',
                    name: 'media',
                },
                'rules',
            ],
            { severity: 'warning' },
        ],
        'media-feature-range-notation': 'prefix',
        'scss/at-extend-no-missing-placeholder': [true, { severity: 'warning' }],
        'scss/comment-no-empty': null,
    },
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md'],
};
