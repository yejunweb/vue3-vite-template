import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { router } from '@src/router/index';
import { isNavigationFailure } from 'vue-router';
import { useStoreUser } from '@src/store/modules/user';

router.beforeEach(async (to, _from, next) => {
    NProgress.start();

    const storeUser = useStoreUser();

    if (to.query.token) {
        storeUser.auth.token = to.query.token as string;
    }

    if (!to.meta.whiteList) {
        // 目标路由非白名单路由，执行相关逻辑
    }
    next();
});

router.afterEach((_to, _from, failure) => {
    NProgress.done();
    if (isNavigationFailure(failure)) {
        console.error('路由错误啦', failure);
    }
});
