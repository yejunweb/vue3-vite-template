# 项目文档

## 项目概述

**vue3-vite-template** 是一个基于 UniApp 框架开发的跨平台移动应用项目，使用 Vue 3 + TypeScript + Vite 构建。项目支持 H5、小程序（微信、支付宝等）、App（Android/iOS）多端运行。

- **项目名称**: vue3-vite-template
- **项目描述**: mobile app of weiguan
- **框架版本**: unibest 4.1.0
- **Vue 版本**: 3.4.21
- **TypeScript**: ~5.8.0
- **构建工具**: Vite 5.2.8
- **包管理器**: pnpm 10.10.0

## 目录结构

```
vue3-vite-template/
├── dist/                    # 构建输出目录
│   ├── dev/                 # 开发环境构建产物
│   │   ├── app/            # App 端构建产物
│   │   ├── app-plus/       # App Plus 构建产物
│   │   ├── h5/             # H5 端构建产物
│   │   └── mp-weixin/      # 微信小程序构建产物
│   └── build/               # 生产环境构建产物
│       ├── app/            # App 端构建产物
│       └── h5/             # H5 端构建产物
├── docs/                    # 项目文档
│   ├── login.md            # 登录相关文档
│   ├── router.md            # 路由相关文档
│   ├── tabbar.md           # TabBar 相关文档
│   ├── useScroll.md        # 滚动相关文档
│   └── vite-plugins.md     # Vite 插件文档
├── env/                     # 环境变量配置目录
│   ├── .env.development    # 开发环境变量
│   ├── .env.production     # 生产环境变量
│   └── .env.test           # 测试环境变量
├── node_modules/           # 依赖包
├── scripts/                 # 构建脚本
│   ├── create-base-files.js    # 创建基础文件脚本
│   ├── open-dev-tools.js       # 打开开发者工具脚本
│   └── postupgrade.js          # 升级后处理脚本
├── src/                     # 源代码目录
│   ├── api/                 # API 接口定义
│   │   ├── login.ts        # 登录相关接口（旧版）
│   │   ├── modules/        # API 模块
│   │   │   └── auth.ts     # 认证相关接口（验证码、登录、用户信息）
│   │   └── types/          # API 类型定义
│   │       ├── auth.ts     # 认证相关类型
│   │       └── login.ts    # 登录相关类型
│   ├── components/          # 公共组件
│   │   ├── wg-global-loading/    # 全局加载组件
│   │   ├── wg-global-message/    # 全局消息框组件
│   │   └── wg-global-toast/      # 全局提示组件
│   ├── hooks/               # Vue Composition API Hooks
│   │   ├── useGlobalLoading.ts   # 全局加载 Hook
│   │   ├── useGlobalMessage.ts    # 全局消息框 Hook
│   │   ├── useGlobalToast.ts      # 全局提示 Hook
│   │   ├── useRequest.ts   # 请求 Hook
│   │   ├── useScroll.ts    # 滚动 Hook
│   │   ├── useTheme.ts     # 主题 Hook
│   │   └── useUpload.ts    # 上传 Hook
│   ├── http/                # HTTP 请求封装
│   │   ├── http.ts         # HTTP 请求核心方法
│   │   ├── interceptor.ts  # 请求拦截器
│   │   ├── types.ts        # HTTP 类型定义
│   │   └── tools/          # HTTP 工具函数
│   │       ├── enum.ts     # 枚举定义（响应状态码）
│   │       └── queryString.ts  # 查询字符串处理
│   ├── layouts/             # 布局组件
│   │   └── default.vue     # 默认布局（使用 slot 插槽）
│   ├── pages/               # 页面目录
│   │   ├── 404/            # 404 页面
│   │   │   └── index.vue
│   │   ├── index/          # 首页
│   │   │   └── index.vue
│   │   ├── login/          # 登录注册页
│   │   │   └── login.vue
│   │   └── mine/           # 个人中心
│   │       └── index.vue
│   ├── router/              # 路由配置
│   │   ├── config.ts       # 路由配置（登录策略等）
│   │   └── interceptor.ts  # 路由拦截器
│   ├── static/              # 静态资源
│   │   ├── app/            # App 相关资源
│   │   │   └── icons/      # App 图标
│   │   ├── images/         # 图片资源
│   │   ├── my-icons/       # 自定义图标
│   │   ├── tabbar/         # TabBar 图标
│   │   └── logo.png        # 应用 Logo
│   ├── store/               # 状态管理（Pinia）
│   │   ├── index.ts        # Store 入口
│   │   └── modules/        # Store 模块
│   │       ├── captcha.ts  # 验证码状态管理
│   │       └── user.ts     # 用户信息管理
│   ├── style/               # 样式文件
│   │   ├── iconfont.css    # 图标字体样式
│   │   ├── index.scss      # 全局样式
│   │   └── theme/          # 主题样式
│   │       └── index.scss
│   ├── tabbar/              # TabBar 配置
│   │   ├── config.ts       # TabBar 配置
│   │   ├── index.vue       # TabBar 组件
│   │   ├── store.ts        # TabBar 状态管理
│   │   └── types.ts        # TabBar 类型定义
│   ├── types/               # TypeScript 类型定义
│   │   ├── async-component.d.ts  # 异步组件类型
│   │   ├── async-import.d.ts      # 异步导入类型
│   │   ├── auto-import.d.ts       # 自动导入类型
│   │   ├── components.d.ts        # 组件类型
│   │   └── uni-pages.d.ts         # 页面类型
│   ├── utils/               # 工具函数
│   │   ├── debounce.ts     # 防抖函数
│   │   ├── index.ts        # 工具函数入口（路由、环境判断等）
│   │   ├── storage.ts      # 存储工具（基于 @vueuse/core）
│   │   ├── systemInfo.ts   # 系统信息
│   │   ├── toLoginPage.ts  # 跳转登录页
│   │   └── uploadFile.ts   # 文件上传
│   ├── App.vue             # 根组件
│   ├── App.ku.vue          # Ku 模式根组件
│   ├── main.ts             # 应用入口
│   ├── manifest.json       # 应用配置清单
│   ├── pages.json          # 页面配置（自动生成）
│   └── uni.scss            # UniApp 全局样式变量
├── vite-plugins/            # 自定义 Vite 插件
│   ├── copy-native-resources.ts  # 原生资源复制插件
│   └── sync-manifest-plugins.ts  # Manifest 同步插件
├── .gitignore              # Git 忽略配置
├── eslint.config.mjs       # ESLint 配置
├── favicon.ico             # 网站图标
├── index.html              # HTML 入口
├── manifest.config.ts      # Manifest 配置
├── package.json            # 项目配置和依赖
├── pages.config.ts         # 页面配置
├── pnpm-lock.yaml          # pnpm 锁文件
├── README.md               # 项目文档
├── tsconfig.json           # TypeScript 配置
├── uno.config.ts           # UnoCSS 配置
└── vite.config.ts          # Vite 构建配置
```

## 模块功能说明

### 1. 核心模块

#### 1.1 应用入口 (`src/main.ts`)
- 创建 Vue 应用实例
- 注册全局状态管理（Pinia）
- 注册路由拦截器
- 注册请求拦截器
- 引入全局样式和 UnoCSS

#### 1.2 状态管理 (`src/store/`)
- **index.ts**: Pinia 实例创建，使用 `setActivePinia` 立即激活实例（解决 APP 端白屏问题）
- **modules/user.ts**: 用户信息管理
  - 使用 `useUniStorage` 实现数据持久化（基于 `@vueuse/core`）
  - 管理用户认证信息（token）和用户信息
  - 提供 `setAuth`、`getUser`、`logout` 方法
  - 提供 `hasLogin` 计算属性判断登录状态
- **modules/captcha.ts**: 验证码状态管理
  - 管理验证码图片和 UUID
  - 提供 `getCaptchaInfo` 方法获取验证码
  - 自动初始化时获取验证码

#### 1.3 路由系统 (`src/router/`)
- **config.ts**: 
  - 登录策略配置（黑名单/白名单）
  - 登录页、404 页路由定义
  - 排除登录路径配置（`EXCLUDE_LOGIN_PATH_LIST`）
  - 支持在页面中使用 `definePage({ excludeLoginPath: true })` 排除登录验证
- **interceptor.ts**: 路由拦截器，实现登录验证和权限控制
  - 拦截 `navigateTo`、`reLaunch`、`redirectTo`、`switchTab` 等路由方法
  - 自动处理相对路径转换
  - 检查路由是否存在，不存在则跳转到 404 页
  - 自动处理 TabBar 索引
  - 已登录用户访问登录页时自动跳转到首页或 redirect 参数指定的页面
  - 支持系统内部页面白名单（如选择位置、文件选择器等）

**登录策略说明**:
- `DEFAULT_NO_NEED_LOGIN (0)`: 黑名单策略，默认可以进入 APP，只有黑名单中的页面需要登录
- `DEFAULT_NEED_LOGIN (1)`: 白名单策略，默认需要登录，只有白名单中的页面不需要登录

**路由拦截流程**:
1. 检查是否为系统内部页面（直接放行）
2. 检查路由是否存在（不存在则跳转 404）
3. 自动设置 TabBar 索引
4. 小程序端且不使用 H5 登录页时直接放行
5. 已登录用户访问登录页时跳转首页
6. 根据登录策略（黑名单/白名单）进行登录验证

### 2. HTTP 请求模块 (`src/http/`)

#### 2.1 核心功能 (`http.ts`)
- 封装 `uni.request`，提供统一的请求接口
- 支持 GET、POST、PUT、DELETE 方法
- **自动处理 401 错误**：
  - 检测 HTTP 状态码 401 或业务码 401
  - 自动清理用户信息（调用 `storeUser.logout()`）
  - 自动跳转到登录页（调用 `toLoginPage()`）
- **统一错误处理**：
  - 业务错误（非 0/200 状态码）自动提示错误信息
  - 网络错误自动提示"网络错误，换个网络试试"
  - 支持 `hideErrorToast` 选项隐藏错误提示
- **支持与 axios 类似的 API 调用方式**：
  - `http.get()`、`http.post()`、`http.put()`、`http.delete()`

#### 2.2 拦截器 (`interceptor.ts`)
- **请求拦截**：
  - 自动拼接查询参数（query）
  - 自动拼接基础 URL（支持 H5 代理）
  - 设置请求超时（60s）
  - 添加平台标识请求头（Platform: 'Mobile'）
  - 自动添加 Token 到 Authorization 请求头
  - 支持文件上传拦截
- **响应拦截**：在 `http.ts` 中统一处理响应数据

#### 2.3 工具函数
- **enum.ts**: HTTP 响应状态码枚举（ResultEnum.Success0、ResultEnum.Success200 等）
- **queryString.ts**: 查询字符串处理工具（`stringifyQuery`）

#### 2.4 使用示例
```typescript
import { http } from '@/http/http'
import { httpGet, httpPost } from '@/http/http'

// 方式一：使用 http 方法
const res = await http.get({
  url: '/api/user/info',
  query: { id: 1 }
})

// 方式二：使用 httpGet/httpPost 等方法
const res = await httpGet({
  url: '/api/user/info',
  query: { id: 1 }
})

// POST 请求
const res = await httpPost({
  url: '/api/user/login',
  data: { username: 'admin', password: '123456' }
})

// 隐藏错误提示
const res = await http.get({
  url: '/api/user/info',
  options: { hideErrorToast: true }
})
```

### 3. API 模块 (`src/api/`)

#### 3.1 接口定义
- **login.ts**: 登录相关 API 接口（旧版，包含 login、getUserInfo、logout）
- **modules/auth.ts**: 认证相关接口（新版）
  - `captchaImage()`: 获取图片验证码
  - `login(data)`: 账号密码登录
  - `getInfo()`: 获取用户信息

#### 3.2 类型定义 (`types/`)
- **auth.ts**: 认证相关类型定义（LoginParams、UserInfoData 等）
- **login.ts**: 登录相关类型定义（IAuthLoginRes、IUserInfoRes 等）

### 4. Hooks (`src/hooks/`)

#### 4.1 useRequest
- 异步请求封装 Hook
- 提供 `loading`、`error`、`data` 状态
- 支持立即执行和手动触发
- 支持初始化数据
- 自动处理加载状态和错误处理

#### 4.2 useGlobalLoading
- 全局加载提示 Hook
- 基于 Pinia Store 实现，支持跨页面使用
- 使用 `wot-design-uni` 的 Toast 组件
- 提供 `loading()` 和 `close()` 方法
- 自动记录当前页面，确保只在当前页面显示

#### 4.3 useGlobalMessage
- 全局消息框 Hook（Alert、Confirm、Prompt）
- 基于 Pinia Store 实现，支持跨页面使用
- 使用 `wot-design-uni` 的 Message 组件
- 提供 `show()`、`alert()`、`confirm()`、`close()` 方法
- 支持自定义成功/失败回调

#### 4.4 useGlobalToast
- 全局提示 Hook（成功、错误、警告、信息）
- 基于 Pinia Store 实现，支持跨页面使用
- 使用 `wot-design-uni` 的 Toast 组件
- 提供 `show()`、`success()`、`error()`、`warning()`、`info()`、`close()` 方法
- 支持自定义图标、位置、持续时间等

#### 4.5 useScroll
- 滚动相关功能 Hook
- 用于处理页面滚动事件和状态

#### 4.6 useTheme
- 主题相关功能 Hook
- 用于处理主题切换和主题配置

#### 4.7 useUpload
- 文件上传功能 Hook
- 封装文件上传逻辑

### 5. TabBar 模块 (`src/tabbar/`)

#### 5.1 配置 (`config.ts`)
支持 4 种 TabBar 策略：
- `NO_TABBAR (0)`: 无 TabBar
- `NATIVE_TABBAR (1)`: 完全原生 TabBar
- `CUSTOM_TABBAR_WITH_CACHE (2)`: 有缓存自定义 TabBar
- `CUSTOM_TABBAR_WITHOUT_CACHE (3)`: 无缓存自定义 TabBar

#### 5.2 功能特性
- 支持原生 TabBar 和自定义 TabBar
- 支持多种图标类型：UnoCSS 图标、UI 库图标、iconfont、图片
- TabBar 状态管理和缓存

### 6. 工具函数 (`src/utils/`)

#### 6.1 核心工具 (`index.ts`)
- **API_DOMAINS**: API 域名配置
- **getImageUrl()**: 获取本地图片 URL
- **getOSSUrl()**: 获取 OSS 图片 URL
- **getEnv()**: 获取当前环境（development/production/test）
- **isDevMode()**: 判断是否为开发环境
- **isBuildMode()**: 判断是否为构建模式
- **isTestMode()**: 判断是否为测试环境
- **isProdMode()**: 判断是否为生产环境
- **parseJSON()**: 安全解析 JSON 字符串
- **getLastPage()**: 获取当前页面栈最后一个页面
- **currRoute()**: 获取当前路由信息（path、query）
- **parseUrlToObj()**: 解析 URL 为对象
- **getAllPages()**: 获取所有页面（支持主包和分包，支持按 key 过滤）
- **getCurrentPageTitle()**: 获取当前页面标题
- **HOME_PAGE**: 首页路径常量

#### 6.2 其他工具
- **debounce.ts**: 防抖函数
- **storage.ts**: 存储工具
  - 基于 `@vueuse/core` 的 `useStorage`
  - 兼容 `uni.storage` API
  - 提供 `createStore()` 创建命名空间存储
  - 提供 `useUniStorage()` 全局存储工具
- **systemInfo.ts**: 系统信息获取
- **toLoginPage.ts**: 跳转到登录页
- **uploadFile.ts**: 文件上传工具

### 7. 页面模块 (`src/pages/`)
- **404/index.vue**: 404 错误页面
- **index/index.vue**: 首页
- **login/login.vue**: 登录页面
- **mine/index.vue**: 个人中心页面

### 8. 全局组件 (`src/components/`)

#### 8.1 wg-global-loading
- 全局加载组件
- 基于 `wot-design-uni` 的 `wd-toast` 组件
- 通过 `useGlobalLoading` Hook 控制显示/隐藏
- 支持跨页面使用，自动判断当前页面

#### 8.2 wg-global-message
- 全局消息框组件（Alert、Confirm、Prompt）
- 基于 `wot-design-uni` 的 `wd-message-box` 组件
- 通过 `useGlobalMessage` Hook 控制显示/隐藏
- 支持跨页面使用，自动判断当前页面

#### 8.3 wg-global-toast
- 全局提示组件（成功、错误、警告、信息）
- 基于 `wot-design-uni` 的 `wd-toast` 组件
- 通过 `useGlobalToast` Hook 控制显示/隐藏
- 支持跨页面使用，自动判断当前页面

### 9. 布局系统 (`src/layouts/`)

项目使用 `@uni-helper/vite-plugin-uni-layouts` 插件实现布局系统。

#### 9.1 默认布局 (`default.vue`)
- 使用 `<slot />` 插槽包裹页面内容
- 可在页面中使用 `definePage({ layout: 'default' })` 指定布局

#### 9.2 使用方式
```vue
<script setup lang="ts">
definePage({
  layout: 'default', // 指定使用的布局
})
</script>
```

### 10. 样式系统

#### 10.1 UnoCSS
- 原子化 CSS 框架，配置在 `uno.config.ts`
- 使用 `@uni-helper/unocss-preset-uni` 预设
- 支持图标（Iconify，如 `i-carbon-home`）
- 支持主题色配置
- 在模板中直接使用类名，无需导入

#### 10.2 SCSS
- `src/style/index.scss`: 全局样式入口（在 `main.ts` 中引入）
- `src/style/theme/index.scss`: 主题样式（通过 Vite 配置自动注入到所有 SCSS 文件）
- `src/style/iconfont.css`: 图标字体样式

#### 10.3 uni.scss
- UniApp 全局样式变量文件
- 可在任何 SCSS 文件中使用 UniApp 提供的变量

## Vite 相关插件配置说明

### 1. UniApp 相关插件

#### 1.1 @uni-helper/vite-plugin-uni-layouts
- **功能**: 自动注册布局组件
- **配置位置**: `vite.config.ts` 第 67 行
- **说明**: 支持在页面中通过 `definePage` 配置布局

#### 1.2 @uni-helper/vite-plugin-uni-platform
- **功能**: 平台相关功能支持
- **配置位置**: `vite.config.ts` 第 68 行
- **说明**: 需要与 `@uni-helper/vite-plugin-uni-pages` 插件一起使用

#### 1.3 @uni-helper/vite-plugin-uni-manifest
- **功能**: 自动处理 manifest.json 配置
- **配置位置**: `vite.config.ts` 第 69 行
- **说明**: 同步和更新应用配置清单

#### 1.4 @uni-helper/vite-plugin-uni-pages
- **功能**: 自动生成 pages.json，支持文件系统路由
- **配置位置**: `vite.config.ts` 第 70-76 行
- **配置项**:
  - `exclude`: 排除的文件模式
  - `subPackages`: 分包配置（数组）
  - `dts`: 类型声明文件路径
- **说明**: 自动扫描 `src/pages` 目录生成路由配置

#### 1.5 @uni-helper/plugin-uni
- **功能**: UniApp 核心插件
- **配置位置**: `vite.config.ts` 第 94 行
- **说明**: 必须在其他 UniXXX 插件之后引入

#### 1.6 @uni-ku/bundle-optimizer
- **功能**: 分包优化、模块异步跨包调用、组件异步跨包引用
- **配置位置**: `vite.config.ts` 第 78-88 行
- **配置项**:
  - `enable.optimization`: 启用优化
  - `enable.async-import`: 启用异步导入
  - `enable.async-component`: 启用异步组件
  - `dts.base`: 类型声明文件基础目录
- **说明**: 需要在 UniPages 插件之后执行（需要 pages.json 文件）

#### 1.7 @uni-ku/root
- **功能**: 根页面配置
- **配置位置**: `vite.config.ts` 第 91-93 行
- **配置项**:
  - `excludePages`: 排除的页面模式
- **说明**: 若存在改变 pages.json 的插件，请将 UniKuRoot 放置其后

### 2. 构建优化插件

#### 2.1 UnoCSS
- **功能**: 原子化 CSS 引擎
- **配置位置**: `vite.config.ts` 第 107 行
- **配置文件**: `uno.config.ts`
- **说明**: 提供原子化 CSS 类，支持图标、主题色等功能

#### 2.2 unplugin-auto-import
- **功能**: 自动导入 Vue、uni-app API
- **配置位置**: `vite.config.ts` 第 108-113 行
- **配置项**:
  - `imports`: 自动导入的模块（'vue', 'uni-app'）
  - `dts`: 类型声明文件路径
  - `dirs`: 自动导入的目录（hooks）
  - `vueTemplate`: 是否在 Vue 模板中启用
- **说明**: 无需手动导入 Vue API 和 uni-app API

#### 2.3 @uni-helper/vite-plugin-uni-components
- **功能**: 自动注册组件
- **配置位置**: `vite.config.ts` 第 142-147 行
- **配置项**:
  - `extensions`: 组件文件扩展名
  - `deep`: 是否递归扫描子目录
  - `directoryAsNamespace`: 是否使用目录名作为命名空间
  - `dts`: 类型声明文件路径
- **说明**: 自动扫描并注册组件，无需手动导入

### 3. 开发体验插件

#### 3.1 vite-plugin-restart
- **功能**: 修改 vite.config.js 文件后自动重启
- **配置位置**: `vite.config.ts` 第 114-117 行
- **说明**: 提升开发体验，修改配置无需手动重启

#### 3.2 rollup-plugin-visualizer
- **功能**: 打包分析工具
- **配置位置**: `vite.config.ts` 第 126-133 行
- **触发条件**: H5 平台 + 生产环境
- **输出**: `./node_modules/.cache/visualizer/stats.html`
- **功能**: 分析打包体积，支持 gzip 和 brotli 压缩分析

#### 3.3 HTML 转换插件（自定义）
- **功能**: H5 环境增加 BUILD_TIME 和 VITE_APP_TITLE
- **配置位置**: `vite.config.ts` 第 119-124 行
- **触发条件**: H5 平台
- **说明**: 在 HTML 中替换 `%BUILD_TIME%` 和 `%VITE_APP_TITLE%`

### 4. 自定义插件

#### 4.1 fix-vite-plugin-vue（自定义）
- **功能**: 修复 dcloudio 官方的 @dcloudio/uni-mp-compiler 编译 BUG
- **配置位置**: `vite.config.ts` 第 95-106 行
- **说明**: 禁用 vite:vue 插件的 devToolsEnabled，强制编译 vue 模板时 inline 为 true
- **参考**: https://github.com/dcloudio/uni-app/issues/4952

#### 4.2 copy-native-resources（自定义）
- **功能**: 复制 UniApp 本地原生插件资源
- **配置文件**: `vite-plugins/copy-native-resources.ts`
- **配置位置**: `vite.config.ts` 第 135-140 行
- **触发条件**: App 平台 + `VITE_COPY_NATIVE_RES_ENABLE === 'true'`
- **功能说明**:
  - 将项目根目录下的 `nativeplugins` 目录复制到构建输出目录
  - 解决 UniApp 使用本地原生插件时，打包后原生插件资源找不到的问题
  - 支持 Android 和 iOS 平台
- **配置项**:
  - `enable`: 是否启用插件
  - `sourceDir`: 源目录路径（默认: 'nativeplugins'）
  - `targetDirName`: 目标目录名称（默认: 'nativeplugins'）
  - `verbose`: 是否显示详细日志
  - `logPrefix`: 日志前缀

#### 4.3 sync-manifest-plugin（自定义）
- **功能**: 同步 manifest.json 中的 plugins 配置
- **配置文件**: `vite-plugins/sync-manifest-plugins.ts`
- **配置位置**: `vite.config.ts` 第 141 行
- **功能说明**:
  - 将 `src/manifest.json` 中的 `app-plus.distribute.plugins` 同步到 `dist/dev/app/manifest.json` 的 `plus.distribute.plugins`
  - 确保原生插件配置在构建后正确保留
- **执行时机**: 构建完成后（`writeBundle` hook）

#### 4.4 openDevTools（自定义）
- **功能**: 自动打开开发者工具
- **配置文件**: `scripts/open-dev-tools.js`
- **配置位置**: `vite.config.ts` 第 149 行
- **说明**: 必须修改 .env 文件中的 `VITE_WX_APPID` 才能使用

### 5. Vite 核心配置

#### 5.1 环境变量
- **配置**: `envDir: './env'` - 自定义 env 目录
- **使用**: 通过 `loadEnv(mode, path)` 加载环境变量
- **环境变量说明**:
  - `VITE_APP_PORT`: 开发服务器端口
  - `VITE_SERVER_BASEURL`: 服务器基础 URL
  - `VITE_APP_TITLE`: 应用标题
  - `VITE_DELETE_CONSOLE`: 是否删除 console
  - `VITE_APP_PUBLIC_BASE`: 公共基础路径
  - `VITE_APP_PROXY_ENABLE`: 是否启用代理
  - `VITE_APP_PROXY_PREFIX`: 代理前缀
  - `VITE_COPY_NATIVE_RES_ENABLE`: 是否启用原生资源复制

#### 5.2 路径别名
```typescript
alias: {
    '@': path.join(process.cwd(), './src'),
    '@img': path.join(process.cwd(), './src/static/images'),
}
```

#### 5.3 开发服务器
- **host**: '0.0.0.0' - 允许外部访问
- **hmr**: true - 启用热模块替换
- **port**: 从环境变量读取
- **proxy**: 根据 `VITE_APP_PROXY_ENABLE` 配置代理（仅 H5 端生效）

#### 5.4 构建配置
- **sourcemap**: false（生产环境）
- **target**: 'es6'
- **minify**: 开发环境不压缩，生产环境使用 'esbuild'
- **esbuild.drop**: 根据 `VITE_DELETE_CONSOLE` 删除 console 和 debugger

## 快速开始

### 环境要求
- Node.js >= 20
- pnpm >= 9

### 安装依赖
```bash
pnpm install
```

### 环境变量配置
在 `env/` 目录下创建环境变量文件：
- `.env.development` - 开发环境
- `.env.production` - 生产环境
- `.env.test` - 测试环境

主要环境变量：
- `VITE_APP_PORT`: 开发服务器端口
- `VITE_SERVER_BASEURL`: 服务器基础 URL
- `VITE_APP_TITLE`: 应用标题
- `VITE_APP_PROXY_ENABLE`: 是否启用代理（H5 端）
- `VITE_APP_PROXY_PREFIX`: 代理前缀
- `VITE_COPY_NATIVE_RES_ENABLE`: 是否启用原生资源复制（App 端）

### 初始化基础文件
```bash
pnpm init-baseFiles
```

## 开发命令

### 开发环境
```bash
# H5 开发
pnpm dev:h5

# 微信小程序开发
pnpm dev:mp-weixin

# App 开发
pnpm dev:app

# 指定环境（test/production）
pnpm dev:h5:test
pnpm dev:h5:prod
```

### 生产构建
```bash
# H5 构建
pnpm build:h5

# 微信小程序构建
pnpm build:mp-weixin

# App 构建
pnpm build:app

# 指定环境（test/production）
pnpm build:h5:test
pnpm build:h5:prod
```

### 其他命令
```bash
# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 代码修复
pnpm lint:fix

# 升级 uni-app 版本
pnpm uvm

# 清理升级后的临时文件
pnpm uvm-rm
```

## 技术栈

- **框架**: Vue 3.4.21 + TypeScript 5.8.0
- **构建工具**: Vite 5.2.8
- **UI 框架**: wot-design-uni（最新版）
- **状态管理**: Pinia 2.0.36 + @vueuse/core 14.0.0（数据持久化）
- **CSS 框架**: UnoCSS 66.0.0
- **路由**: uni-app 路由系统（基于 @uni-helper/vite-plugin-uni-pages）
- **HTTP 客户端**: uni.request（封装）
- **工具库**: 
  - dayjs 1.11.10（日期处理）
  - lodash-es 4.17.21（工具函数）
  - @vueuse/core 14.0.0（组合式 API 工具集）
- **分页组件**: z-paging 2.8.7
- **代码规范**: ESLint 9.31.0 + @uni-helper/eslint-config
- **Git Hooks**: Husky 9.1.7 + lint-staged 15.2.10

## 数据持久化

项目使用 `@vueuse/core` 的 `useStorage` 实现数据持久化，而非 `pinia-plugin-persistedstate`。

### 存储工具 (`src/utils/storage.ts`)
- 提供 `useUniStorage` 全局存储工具，兼容 `uni.storage` API
- 提供 `createStore` 创建命名空间存储（用于全局组件状态）
- 自动序列化/反序列化 JSON 数据
- 支持响应式数据绑定

### 使用示例
```typescript
// 在 Store 中使用
import { useUniStorage } from '@/utils/storage'

const user = useUniStorage<Partial<UserInfoData>>('user', {})

// 在组件中使用
const { useUniStorage } = createStore('wg-global-loading')
const loadingOptions = useUniStorage<ToastOptions>('loadingOptions', defaultOptions)
```

## 全局组件使用

### 全局加载
```typescript
import { useGlobalLoading } from '@/hooks/useGlobalLoading'

const { loading, close } = useGlobalLoading()

// 显示加载
loading('加载中...')
// 或
loading({ msg: '加载中...', duration: 0 })

// 关闭加载
close()
```

### 全局消息框
```typescript
import { useGlobalMessage } from '@/hooks/useGlobalMessage'

const { alert, confirm, close } = useGlobalMessage()

// 警告框
alert('提示信息')

// 确认框
confirm({
  title: '确认删除？',
  success: (res) => {
    if (res.confirm) {
      // 用户点击确认
    }
  }
})
```

### 全局提示
```typescript
import { useGlobalToast } from '@/hooks/useGlobalToast'

const { success, error, warning, info, close } = useGlobalToast()

// 成功提示
success('操作成功')

// 错误提示
error('操作失败')

// 警告提示
warning('警告信息')

// 信息提示
info('提示信息')
```

## 注意事项

1. **插件执行顺序**: UniXXX 插件需要在 Uni 插件之前引入，Optimization 插件需要在 UniPages 插件之后执行
2. **环境变量**: 环境变量文件存放在 `env/` 目录，而非根目录
3. **登录策略**: 默认使用白名单策略（`DEFAULT_NEED_LOGIN`），需要登录才能访问
   - 可在 `src/router/config.ts` 中修改 `LOGIN_STRATEGY` 切换策略
   - 可在页面中使用 `definePage({ excludeLoginPath: true })` 排除登录验证
4. **TabBar 策略**: 默认使用有缓存自定义 TabBar（`CUSTOM_TABBAR_WITH_CACHE`）
   - 可在 `src/tabbar/config.ts` 中修改 `selectedTabbarStrategy` 切换策略
5. **原生插件**: 如需使用本地原生插件，需要在项目根目录创建 `nativeplugins` 目录，并启用 `VITE_COPY_NATIVE_RES_ENABLE` 环境变量
6. **类型声明**: 多个插件会自动生成类型声明文件，存放在 `src/types/` 目录
7. **Pinia 激活**: 使用 `setActivePinia` 立即激活 Pinia 实例，解决 APP 端白屏问题
8. **全局组件**: 全局组件（loading、message、toast）需要在页面中引入对应的组件才能使用
9. **存储系统**: 项目使用 `@vueuse/core` 的 `useStorage` 而非 `pinia-plugin-persistedstate` 实现数据持久化

## 项目配置说明

### 路径别名
- `@`: `src/` 目录
- `@img`: `src/static/images/` 目录

### 自动导入
项目配置了 `unplugin-auto-import`，以下内容无需手动导入：
- Vue 3 API（ref、computed、watch 等）
- uni-app API（uni.request、uni.navigateTo 等）
- `src/hooks/` 目录下的所有 Hooks

### 组件自动注册
项目配置了 `@uni-helper/vite-plugin-uni-components`，`src/components/` 目录下的组件会自动注册，无需手动导入。

### 页面配置
- 使用 `@uni-helper/vite-plugin-uni-pages` 自动生成 `pages.json`
- 支持在页面中使用 `definePage()` 配置页面元信息
- 支持文件系统路由，自动扫描 `src/pages` 目录

### 类型声明
以下类型声明文件由插件自动生成，位于 `src/types/`：
- `auto-import.d.ts`: 自动导入的类型声明
- `components.d.ts`: 组件类型声明
- `uni-pages.d.ts`: 页面路由类型声明
- `async-component.d.ts`: 异步组件类型声明
- `async-import.d.ts`: 异步导入类型声明

## 常见问题

### 1. APP 端白屏问题
项目已通过 `setActivePinia(store)` 立即激活 Pinia 实例来解决此问题。

### 2. 全局组件不显示
确保在页面中引入了对应的全局组件：
```vue
<template>
  <wg-global-loading />
  <wg-global-message />
  <wg-global-toast />
</template>
```

### 3. 环境变量不生效
- 确保环境变量文件在 `env/` 目录下
- 确保环境变量以 `VITE_` 开头
- 修改环境变量后需要重启开发服务器

### 4. 类型声明文件缺失
运行 `pnpm dev` 或 `pnpm build` 后，插件会自动生成类型声明文件。

### 5. 小程序端请求失败
- 检查 `VITE_SERVER_BASEURL` 配置是否正确
- 检查服务器是否支持跨域（H5 端）
- 检查网络请求域名是否在小程序后台配置

## 参考文档

- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [UnoCSS 官方文档](https://unocss.dev/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [@vueuse/core 文档](https://vueuse.org/)
- [wot-design-uni 文档](https://wot-design-uni.netlify.app/)
- [unibest 项目](https://github.com/feige996/unibest)

