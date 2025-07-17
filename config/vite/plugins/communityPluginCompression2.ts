import type { Plugin } from 'vite';
import { compression } from 'vite-plugin-compression2';
import { isEnvTrue } from '../../utils';

export const communityPluginCompression2 = ({ VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE }: ImportMetaEnv) => {
    const plugins: Plugin[] = [];
    const compressList = VITE_BUILD_COMPRESS.split(',');
    const deleteOriginalAssets = isEnvTrue(VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE);
    if (compressList.includes('gzip')) {
        plugins.push(
            compression({
                deleteOriginalAssets,
            })
        );
    }
    if (compressList.includes('brotli')) {
        plugins.push(
            compression({
                algorithm: 'brotliCompress',
                deleteOriginalAssets,
            })
        );
    }
    return plugins;
};
