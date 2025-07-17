# Vue3 + vite 模版

-   分支 master 是 ts 基础模板

### 使用该模板前请先修改以下变量

```
// .env

VITE_APP_TITLE=应用名称
VITE_APP_STORAGE_KEY=本地持久化key
VITE_PORT=11226
```

```
// .env.development & .env.staging & .env.production

VITE_APP_API_URL=后台 api 地址
```

### 模板预设了以下功能

##### svg icon 集成

-   可以在项目中使用 components/SvgIcon 组件来引用 assets/svg 下的 svg 文件

##### setup 中定义组件 name

-   使用 defineOptions(vue@3.3+)

##### 状态持久化和加密

-   使用配置 utils/storage 导出的 `useLocalStorage`,`useSessionStorage` 的方法
-   const xxx = useLocalStorage('key', 'initValue')
-   xxx 就是一个响应式的 localStorage 数据
-   默认配置 { crypto: !isDevMode() }，在非开发环境下使用 crypto-js 加密

##### axios 拦截器

-   自动取消重复请求，可以用过在 config 里配置 multiple: true 关闭
-   delayRequest 方法，可以获得 start 和 cancel，start 即原先的 request，和普通请求的区别在于可以拿到当前请求的 cancel 在合适的情况调用
-   clearPending 方法，可以取消所有正在请求的接口

##### 提交检查以及格式化

-   提交检查流程配置文件 {cwd}/lint-stage.config.js，每次提交都会对每种类型进行相对应的操作
-   eslint(检验代码格式) [配置](https://eslint.org/docs/latest/user-guide/configuring/)文件 {cwd}/.eslintrc.cjs
-   prettier(修复代码格式) [配置](https://prettier.io/docs/en/configuration.html)文件 {cwd}/.prettierrc
-   stylelint(检查样式文件) [配置](https://stylelint.io/user-guide/configure/)文件 {cwd}/stylelint.config.js
-   commitlint(检查 git 提交) [配置](https://commitlint.js.org/#/reference-configuration)文件 {cwd}/commitlint.config.js
-   ls-lint(检查文件命名) [配置](https://ls-lint.org/1.x/configuration/the-rules.html)文件 {cwd}/.ls-lint.yml

### 还有这些功能可以通过配置环境变量的方法开启

##### 是否压缩文件

```
// .env

// 可选: gzip | brotli | none
// 同时开启请用逗号分隔，example: `gzip,brotli`
// 如果服务器支持 brotli 压缩可以开启，该方式相比 gzip 体积更小

VITE_BUILD_COMPRESS=gzip
VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE=false
```

##### 是否开启自动按需引入组件(包括 src/components 下的组件)和按需自动导入 API，默认只包涵 vue 和 vue-router

```
// .env

// 可选 VueUseComponents | ElementPlus | NaiveUi | Vant | AntDesign | Arco | DevUi | ElementUi | HeadlessUi | Idux | Inkline | LayuiVue | PrimeVue | Quasar | TDesign | Varlet | Veui | Vuetify3 | Vuetify
// 同时开启请用逗号分隔，example: `VueUseComponents,NaiveUi`

VITE_UNPLUGINS_IMPORTS=''
# 请注意配置完成以后：请手动安装 ui 库的依赖包（当前版本默认已默认配置AntDesign）
```

##### 是否要兼容旧版浏览器

```
// .env

VITE_LEGACY=false
```

##### 是否删除 console

```
// .env

VITE_DROP_CONSOLE=false
```

##### 是否删除 debug

```
// .env

VITE_DROP_DEBUG=true
```

##### 是否开启本地 https

```
// .env.development

VITE_LISTEN_HTTPS=false
```
