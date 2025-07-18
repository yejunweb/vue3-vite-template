import _log from 'electron-log/main';

// Simple logging for Electron
_log.initialize();
export const log = _log;

// Check if in development mode
export const isDevMode = (): boolean => process.env.NODE_ENV === 'development';

// Vite dev server URL
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
