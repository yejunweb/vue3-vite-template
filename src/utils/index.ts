export const getImageUrl = (path: string) => new URL(`../assets/${path}`, import.meta.url).href;

export const getEnv = (): string => import.meta.env.MODE;

export const isDevMode = (): boolean => import.meta.env.DEV;

export const isBuildMode = (): boolean => import.meta.env.PROD;

export const isStageMode = (): boolean => getEnv().includes('staging');

export const isProdMode = (): boolean => import.meta.env.PROD && !isStageMode();
