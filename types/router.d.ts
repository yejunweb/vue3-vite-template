import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        keepAlive?: boolean;
        tabBar?: boolean;
        whiteList?: boolean;
    }
}
