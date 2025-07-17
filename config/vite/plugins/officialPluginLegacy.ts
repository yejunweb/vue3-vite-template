import viteLegacy from '@vitejs/plugin-legacy';

export const officialPluginLegacy = () =>
    viteLegacy({
        targets: ['Chrome 61'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        modernPolyfills: true,
    });
