import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        name: 'Index',
        path: '/',
        component: () => import('@src/views/Index/index'),
        meta: { title: '首页' },
    },
    {
        name: 'About',
        path: '/about',
        component: () => import('@src/views/About/index'),
        meta: { title: '关于' },
    },
    {
        name: 'Forbidden',
        path: '/forbidden',
        component: () => import('@src/views/Forbidden/index'),
        meta: { whiteList: true },
    },
    {
        path: '/:catchAll(.*)',
        redirect: { path: '/forbidden' },
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
