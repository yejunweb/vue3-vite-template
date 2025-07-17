/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PORT: string;
    readonly VITE_APP_TAG: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_STORAGE_KEY: string;
    readonly VITE_PUBLIC_PATH: string;
    readonly VITE_BUILD_COMPRESS: string;
    readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: string;
    readonly VITE_UNPLUGINS_IMPORTS: string;
    readonly VITE_LEGACY: string;
    readonly VITE_DROP_CONSOLE: string;
    readonly VITE_DROP_DEBUG: string;
    readonly VITE_LISTEN_HTTPS: string;
    readonly VITE_APP_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
