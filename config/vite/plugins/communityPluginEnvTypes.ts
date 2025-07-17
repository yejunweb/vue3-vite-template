import EnvTypes from 'vite-plugin-env-types';

export const communityPluginEnvTypes = () =>
    EnvTypes({
        dts: './types/env.d.ts',
    });
