// 全局要用的类型放到这里

declare global {
    interface IResData<T> {
        code: number
        msg: string
        data: T
    }

    // uni.uploadFile文件上传参数
    interface IUniUploadFileOptions {
        file?: File
        files?: UniApp.UploadFileOptionFiles[]
        filePath?: string
        name?: string
        formData?: any
    }

    interface IUserInfo {
        nickname?: string
        avatar?: string
        /** 微信的 openid，非微信没有这个字段 */
        openid?: string
    }

    interface IUserToken {
        token: string
        refreshToken?: string
        refreshExpire?: number
    }
}

// 扩展 @uni-helper/vite-plugin-uni-pages 的 definePage 参数类型
declare module '@uni-helper/vite-plugin-uni-pages' {
    interface UserPageMeta {
    /**
     * 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
     *
     * 尽量保证一个项目 只有一个 这个配置，如果有多个，会按照字母顺序来排列，最终可能不是您想要的效果。
     */
        type?: 'home'
        /**
         * 页面布局类型, 模板默认只有 default, 如果在 src/layouts 下新增了 layout, 可以扩展当前属性
         * @default 'default'
         *
         * 当前属性供 https://github.com/uni-helper/vite-plugin-uni-layouts 插件使用
         */
        layout?: 'default'
        /**
         * 是否从需要登录的路径中排除
         *
         * 登录授权(可选)：跟以前的 needLogin 类似功能，但是同时支持黑白名单，详情请见 src/router 文件夹
         */
        excludeLoginPath?: boolean
    }
}

// patch uni 类型
// 1. 补全 uni.hideToast() 的 options 类型
// 2. 补全 uni.hideLoading() 的 options 类型
// 3. 使用方式见：https://github.com/unibest-tech/unibest/pull/241
declare global {
    declare namespace UniNamespace {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        type HideLoadingCompleteCallback = (res: GeneralCallbackResult) => void
        /** 接口调用失败的回调函数 */
        type HideLoadingFailCallback = (res: GeneralCallbackResult) => void
        /** 接口调用成功的回调函数 */
        type HideLoadingSuccessCallback = (res: GeneralCallbackResult) => void

        interface HideLoadingOption {
            /** 接口调用结束的回调函数（调用成功、失败都会执行） */
            complete?: HideLoadingCompleteCallback
            /** 接口调用失败的回调函数 */
            fail?: HideLoadingFailCallback
            test: UniNamespace.GeneralCallbackResult
            /**
             * 微信小程序：需要基础库： `2.22.1`
             *
             * 微信小程序：目前 toast 和 loading 相关接口可以相互混用，此参数可用于取消混用特性
             */
            noConflict?: boolean
            /** 接口调用成功的回调函数 */
            success?: HideLoadingSuccessCallback
        }

        // ----------------------------------------------------------

        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        type HideToastCompleteCallback = (res: GeneralCallbackResult) => void
        /** 接口调用失败的回调函数 */
        type HideToastFailCallback = (res: GeneralCallbackResult) => void
        /** 接口调用成功的回调函数 */
        type HideToastSuccessCallback = (res: GeneralCallbackResult) => void
        interface HideToastOption {
            /** 接口调用结束的回调函数（调用成功、失败都会执行） */
            complete?: HideToastCompleteCallback
            /** 接口调用失败的回调函数 */
            fail?: HideToastFailCallback
            /**
             * 微信小程序：需要基础库： `2.22.1`
             *
             * 微信小程序：目前 toast 和 loading 相关接口可以相互混用，此参数可用于取消混用特性
             */
            noConflict?: boolean
            /** 接口调用成功的回调函数 */
            success?: HideToastSuccessCallback
        }
    }
    interface Uni {
    /**
     * 隐藏 loading 提示框
     *
     * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=hideloading](http://uniapp.dcloud.io/api/ui/prompt?id=hideloading)
     * @example ```typescript
     * uni.showLoading({
     *   title: '加载中'
     * });
     *
     * setTimeout(function () {
     *   uni.hideLoading();
     * }, 2000);
     *
     * ```
     * @tutorial [](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hideloading)
     * @uniPlatform {
     * "app": {
     * "android": {
     * "osVer": "4.4.4",
     * "uniVer": "√",
     * "unixVer": "3.9.0"
     * },
     * "ios": {
     * "osVer": "9.0",
     * "uniVer": "√",
     * "unixVer": "3.9.0"
     * }
     * }
     * }
     */
        // eslint-disable-next-line ts/method-signature-style
        hideLoading<T extends UniNamespace.HideToastOption = UniNamespace.HideToastOption>(options?: T): void
        /**
         * 隐藏消息提示框
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=hidetoast](http://uniapp.dcloud.io/api/ui/prompt?id=hidetoast)
         * @example ```typescript
         *    uni.hideToast();
         * ```
         * @tutorial [](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hidetoast)
         * @uniPlatform {
         * "app": {
         * "android": {
         * "osVer": "4.4.4",
         * "uniVer": "√",
         * "unixVer": "3.9.0"
         * },
         * "ios": {
         * "osVer": "9.0",
         * "uniVer": "√",
         * "unixVer": "3.9.0"
         * }
         * }
         * }
         */
        // eslint-disable-next-line ts/method-signature-style
        hideToast<T extends UniNamespace.HideLoadingOption = UniNamespace.HideLoadingOption>(options?: T): void

        /**
         * 开发工具对象
         */
        $dev: {
            /**
             * 打开调试弹窗
             */
            show: () => void
            /**
             * 隐藏调试弹窗
             * @param options 可选配置
             * @param options.navigateToUrl 关闭后跳转的页面路径
             */
            hide: (options?: { navigateToUrl?: string }) => void
            /**
             * 错误日志上报
             * @param msg 错误信息，可以是 Error 对象或字符串
             * @param trace 错误堆栈信息
             * @param type 错误类型，默认为 'n'
             * @returns 如果未启用或参数无效返回 false，否则返回 undefined
             */
            errorReport: (msg: Error | string, trace?: string, type?: 've' | 'vw' | 'oe' | 'n') => false | undefined
            /**
             * 运行日志上报
             * @param msg 日志信息，可以是对象或字符串
             * @returns 如果未启用或参数无效返回 false，否则返回 undefined
             */
            logReport: (msg: any) => false | undefined
        }
    }
}

export {} // 防止模块污染
