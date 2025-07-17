/* eslint-disable @typescript-eslint/no-empty-interface */
/// <reference types="vite-plugin-electron/electron-env" />

import type { ipcRenderer } from 'electron';

declare namespace NodeJS {
    interface ProcessEnv {}
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
    ipcRenderer: ipcRenderer;
}
