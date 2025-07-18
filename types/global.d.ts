import type { ComponentPublicInstance, VNodeChild } from 'vue';

declare global {
    // vue
    type VueNode = VNodeChild | JSX.Element;

    // 拓展工具类
    type Writable<T> = {
        -readonly [P in keyof T]: T[P];
    };
    type Nullable<T> = T | null;
    type Recordable<T = any> = Record<string, T>;
    type Prettify<T> = { [P in keyof T]: T[P] } & {};
    type ReadonlyRecordable<T = any> = {
        readonly [key: string]: T;
    };
    type DeepPartial<T> = {
        [P in keyof T]?: DeepPartial<T[P]>;
    };
    declare type ObjectValues<T extends object> = T[keyof T];
    declare type ObjectKeys<T extends object> = keyof T;
    type TimeoutHandle = ReturnType<typeof setTimeout>;
    type IntervalHandle = ReturnType<typeof setInterval>;
    type Mutable<T> = {
        -readonly [P in keyof T]: T[P];
    };

    // 事件
    interface ChangeEvent extends Event {
        target: HTMLInputElement;
    }
    interface WheelEvent {
        path?: EventTarget[];
    }

    // Used in Renderer process, expose in `preload.ts`
    interface Window {
        ipcRenderer: {
            on(channel: string, listener: (event: any, ...args: any[]) => void): void;
            off(channel: string, ...args: any[]): void;
            send(channel: string, ...args: any[]): void;
            invoke(channel: string, ...args: any[]): void;
        };
    }

    type ComponentInstance = ComponentPublicInstance<{}, any>;

    type RequiredParams<T> = T extends (...args: infer P) => infer R ? (...args: { [K in keyof P]-?: NonNullable<P[K]> }) => R : never;
}
