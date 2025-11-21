# 项目文档

## 项目概述

**vue3-vite-template** 是一个基于 UniApp 框架开发的跨平台移动应用项目，使用 Vue 3 + TypeScript + Vite 构建。项目支持 H5、小程序（微信、支付宝等）、App（Android/iOS）多端运行。

- **项目名称**: vue3-vite-template
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
│   └── build/               # 生产环境构建产物
├── docs/                    # 项目文档
│   ├── login.md            # 登录相关文档
│   ├── router.md            # 路由相关文档
│   ├── tabbar.md           # TabBar 相关文档
│   ├── useScroll.md        # 滚动相关文档
│   └── vite-plugins.md     # Vite 插件文档
├── env/                     # 环境变量配置目录
├── node_modules/           # 依赖包
├── scripts/                 # 构建脚本
│   ├── create-base-files.js    # 创建基础文件脚本
│   ├── open-dev-tools.js       # 打开开发者工具脚本
│   └── postupgrade.js          # 升级后处理脚本
├── src/                     # 源代码目录
│   ├── api/                 # API 接口定义
│   │   ├── login.ts        # 登录相关接口
│   │   └── types/          # API 类型定义
│   ├── components/          # 公共组件
│   ├── hooks/               # Vue Composition API Hooks
│   │   ├── useRequest.ts   # 请求 Hook
│   │   ├── useScroll.ts    # 滚动 Hook
│   │   └── useUpload.ts    # 上传 Hook
│   ├── http/                # HTTP 请求封装
│   │   ├── http.ts         # HTTP 请求核心方法
│   │   ├── interceptor.ts  # 请求拦截器
│   │   ├── types.ts        # HTTP 类型定义
│   │   └── tools/          # HTTP 工具函数
│   │       ├── enum.ts     # 枚举定义
│   │       └── queryString.ts  # 查询字符串处理
│   ├── layouts/             # 布局组件
│   │   └── default.vue     # 默认布局
│   ├── pages/               # 页面目录
│   │   ├── 404/            # 404 页面
│   │   ├── index/          # 首页
│   │   ├── login/          # 登录注册页
│   │   └── mine/           # 个人中心
│   ├── router/              # 路由配置
│   │   ├── config.ts       # 路由配置（登录策略等）
│   │   └── interceptor.ts  # 路由拦截器
│   ├── static/              # 静态资源
│   │   ├── app/            # App 相关资源
│   │   ├── images/         # 图片资源
│   │   ├── my-icons/       # 自定义图标
│   │   └── tabbar/         # TabBar 图标
│   ├── store/               # 状态管理（Pinia）
│   │   ├── index.ts        # Store 入口
│   │   ├── token.ts        # Token 管理
│   │   └── user.ts         # 用户信息管理
│   ├── style/               # 样式文件
│   │   ├── iconfont.css    # 图标字体样式
│   │   └── index.scss      # 全局样式
│   ├── tabbar/              # TabBar 配置
│   │   ├── config.ts       # TabBar 配置
│   │   ├── index.vue       # TabBar 组件
│   │   ├── store.ts        # TabBar 状态管理
│   │   └── types.ts        # TabBar 类型定义
│   ├── types/               # TypeScript 类型定义
│   │   ├── async-component.d.ts  # 异步组件类型
│   │   ├── async-import.d.ts      # 异步导入类型
│   │   ├── auto-import.d.ts       # 自动导入类型
│   │   └── uni-pages.d.ts         # 页面类型
│   ├── utils/               # 工具函数
│   │   ├── debounce.ts     # 防抖函数
│   │   ├── index.ts        # 工具函数入口
│   │   ├── systemInfo.ts   # 系统信息
│   │   ├── toLoginPage.ts  # 跳转登录页
│   │   ├── updateManager.wx.ts  # 微信更新管理
│   │   └── uploadFile.ts   # 文件上传
│   ├── App.vue             # 根组件
│   ├── App.ku.vue          # Ku 模式根组件
│   ├── main.ts             # 应用入口
│   ├── manifest.json       # 应用配置清单
│   ├── pages.json          # 页面配置
│   └── uni.scss            # UniApp 全局样式变量
├── vite-plugins/            # 自定义 Vite 插件
│   ├── copy-native-resources.ts  # 原生资源复制插件
│   └── sync-manifest-plugins.ts  # Manifest 同步插件
├── .gitignore              # Git 忽略配置
├── eslint.config.mjs       # ESLint 配置
├── index.html              # HTML 入口
├── manifest.config.ts      # Manifest 配置
├── package.json            # 项目配置和依赖
├── pages.config.ts         # 页面配置
├── pnpm-lock.yaml          # pnpm 锁文件
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
- **index.ts**: Pinia 实例创建，配置数据持久化（使用 `pinia-plugin-persistedstate`）
- **token.ts**: Token 存储和管理，包括登录、登出功能
- **user.ts**: 用户信息存储和管理

#### 1.3 路由系统 (`src/router/`)
- **config.ts**: 
  - 登录策略配置（黑名单/白名单）
  - 登录页、注册页路由定义
  - 排除登录路径配置
- **interceptor.ts**: 路由拦截器，实现登录验证和权限控制

**登录策略说明**:
- `DEFAULT_NO_NEED_LOGIN (0)`: 黑名单策略，默认可以进入 APP，只有黑名单中的页面需要登录
- `DEFAULT_NEED_LOGIN (1)`: 白名单策略，默认需要登录，只有白名单中的页面不需要登录

### 2. HTTP 请求模块 (`src/http/`)

#### 2.1 核心功能 (`http.ts`)
- 封装 `uni.request`，提供统一的请求接口
- 支持 GET、POST、PUT、DELETE 方法
- 自动处理 401 错误（Token 过期），跳转登录页
- 统一错误处理和提示
- 支持与 axios 类似的 API 调用方式

#### 2.2 拦截器 (`interceptor.ts`)
- 请求拦截：添加 Token、统一请求头
- 响应拦截：统一处理响应数据

#### 2.3 工具函数
- **enum.ts**: HTTP 响应状态码枚举
- **queryString.ts**: 查询字符串处理工具

### 3. API 模块 (`src/api/`)
- **login.ts**: 登录相关 API 接口
- **types/**: API 请求和响应的 TypeScript 类型定义

### 4. Hooks (`src/hooks/`)

#### 4.1 useRequest
- 异步请求封装 Hook
- 提供 `loading`、`error`、`data` 状态
- 支持立即执行和手动触发
- 支持初始化数据

#### 4.2 useScroll
- 滚动相关功能 Hook
- 用于处理页面滚动事件和状态

#### 4.3 useUpload
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
- **debounce.ts**: 防抖函数
- **index.ts**: 工具函数集合
- **systemInfo.ts**: 系统信息获取
- **toLoginPage.ts**: 跳转到登录页
- **updateManager.wx.ts**: 微信小程序更新管理
- **uploadFile.ts**: 文件上传工具

### 7. 页面模块 (`src/pages/`)
- **404/index.vue**: 404 错误页面
- **index/index.vue**: 首页
- **login/**: 登录和注册页面
  - `login.vue`: 登录页
- **mine/index.vue**: 个人中心页面

### 8. 样式系统
- **UnoCSS**: 原子化 CSS 框架，配置在 `uno.config.ts`
- **SCSS**: 全局样式文件 `src/style/index.scss`
- **iconfont**: 图标字体样式 `src/style/iconfont.css`

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

## 开发命令

### 开发环境
```bash
# H5 开发
pnpm dev:h5

# 微信小程序开发
pnpm dev:mp-weixin

# App 开发
pnpm dev:app
```

### 生产构建
```bash
# H5 构建
pnpm build:h5

# 微信小程序构建
pnpm build:mp-weixin

# App 构建
pnpm build:app
```

### 其他命令
```bash
# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 代码修复
pnpm lint:fix
```

## 技术栈

- **框架**: Vue 3.4.21 + TypeScript 5.8.0
- **构建工具**: Vite 5.2.8
- **UI 框架**: wot-design-uni（最新版）
- **状态管理**: Pinia 2.0.36 + pinia-plugin-persistedstate 3.2.1
- **CSS 框架**: UnoCSS 66.0.0
- **路由**: uni-app 路由系统
- **HTTP 客户端**: uni.request（封装）
- **工具库**: dayjs 1.11.10
- **分页组件**: z-paging 2.8.7

## 注意事项

1. **插件执行顺序**: UniXXX 插件需要在 Uni 插件之前引入，Optimization 插件需要在 UniPages 插件之后执行
2. **环境变量**: 环境变量文件存放在 `env/` 目录，而非根目录
3. **登录策略**: 默认使用白名单策略（`DEFAULT_NEED_LOGIN`），需要登录才能访问
4. **TabBar 策略**: 默认使用有缓存自定义 TabBar（`CUSTOM_TABBAR_WITH_CACHE`）
5. **原生插件**: 如需使用本地原生插件，需要在项目根目录创建 `nativeplugins` 目录，并启用 `VITE_COPY_NATIVE_RES_ENABLE` 环境变量
6. **类型声明**: 多个插件会自动生成类型声明文件，存放在 `src/types/` 目录

## 参考文档

- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [UnoCSS 官方文档](https://unocss.dev/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [unibest 项目](https://github.com/feige996/unibest)

