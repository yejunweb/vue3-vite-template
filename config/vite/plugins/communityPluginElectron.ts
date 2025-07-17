import electron from 'vite-plugin-electron/simple';
import path from 'node:path';

// https://github.com/electron-vite/vite-plugin-electron
export const communityPluginElectron = (): any =>
    electron({
        main: {
            // Shortcut of `build.lib.entry`.
            entry: path.resolve(process.cwd(), 'electron/main.ts'),
        },
        preload: {
            // Shortcut of `build.rollupOptions.input`
            input: path.resolve(process.cwd(), 'electron/preload.ts'),
        },
        // Optional: Use Node.js API in the Renderer process
        renderer: {},
    });
