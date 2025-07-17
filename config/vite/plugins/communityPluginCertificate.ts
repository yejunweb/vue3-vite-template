import VitePluginCertificate from 'vite-plugin-mkcert';

export const communityPluginCertificate = (): any =>
    VitePluginCertificate({
        source: 'coding',
    });
