export function isEnvTrue(v: string) {
    return v === 'true';
}

export const isCustomElement = (tag: string) => ['micro-app', 'wx-open-launch-weapp'].some(v => v === tag);
