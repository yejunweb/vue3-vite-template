import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    { path: '/', meta: { title: '首页' }, component: () => import('@src/views/Demo/Tsx') },
    { path: '/about', meta: { title: '关于' }, component: () => import('@src/views/Demo/Normal.vue') },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
