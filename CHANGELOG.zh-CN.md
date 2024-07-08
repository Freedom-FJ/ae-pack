---
order: 6
title: 更新日志
toc: false
timeline: true
---

`aepay-pkg` 遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---
<div class="changelog"></div>

## aepay-chart
- multi-bar-chart
  - feat: ✨增加了itemPadding属性用于调节柱子间间距 [#c47e59f](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/c47e59f) `2024-03-11` 
  - feat: ✨新增多列条形图 [#3f57117](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/3f57117) `2024-03-11` 

- stack-chart
  - feat: ✨增加了itemPadding属性用于调节柱子间间距 [#c47e59f](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/c47e59f) `2024-03-11` 
  - fix: 🐛修复图例隐藏时tooltip没有隐藏问题 [#02d3b6c](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/02d3b6c) `2024-03-11` 
  - feat: ✨增加列宽属性设置 [#c94f824](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/c94f824) `2024-03-08` 
  - feat: ✨堆叠图组件 [#35df7e4](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/35df7e4) `2024-03-08` 

- sankey
  - feat: ✨增加桑基图组件 [#d9cf101](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/d9cf101) `2024-03-07` 



---
## aepay-hooks
- useEffectCompare
  - feat: ✨增加useEffectCompare方法 [#7cfa555](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/7cfa555) `2024-05-22` 

- useEffectOnce
  - feat: ✨增加useEffectOnce方法 [#e9d563b](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/e9d563b) `2024-05-20` 

- usePropsValue
  - feat: ✨新增usePropsValue hooks [#da41137](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/da41137) `2024-04-07` 

- useTable
  - feat: ✨增加useTable hook处理分页查询 [#4a799b7](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/4a799b7) `2024-02-20` 

- useEventLoading
  - feat: ✨增加useEventLoading hook [#87183a1](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/87183a1) `2024-02-19` 

- useUuid
  - feat: ✨增加useUuid hook [#10b46f8](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/10b46f8) `2024-02-04` 

- useMemoFunc
  - feat: ✨添加hook useMemoFunc [#60a8def](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/60a8def) `2024-02-04` 

- useEventDelegation
  - fix: 🐛添加事件委托方法 [#dd8619a](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/dd8619a) `2024-02-02` 

- useLocale
  - feat: ✨增加useLocale 用于异步获取mds配置 [#9ffbfb0](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/9ffbfb0) `2024-01-23` 

- useTitle
  - feat: 文档补充 [#fe3431a](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/fe3431a) `2024-01-15` 
  - feat: 补充文档 [#2a2e20f](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/2a2e20f) `2024-01-09` 
  - feat: hooks文档 [#c5a751a](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/c5a751a) `2023-11-30` 

- useTimeout
  - feat: 补充文档 [#2a2e20f](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/2a2e20f) `2024-01-09` 

- useMtop
  - feat: 增加useRequest、useMtop hooks [#c19be8e](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/c19be8e) `2024-01-05` 

- useRequest
  - feat: 增加useRequest、useMtop hooks [#c19be8e](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/c19be8e) `2024-01-05` 



---
## aepay-ui
- product-info
  - feat: ✨增加商品预览图片功能 [#70dcd4e](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/70dcd4e) `2024-07-03` 
  - feat: ✨商品组件增加hiddenSKUDesc属性 [#c3a73d0](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/c3a73d0) `2024-04-19` 
  - feat: ✨增加商品信息组件展示 [#1a2e8dd](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/1a2e8dd) `2024-02-27` 

- rich-text
  - feat: ✨增加\n换行适配 [#c6c3057](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/c6c3057) `2024-07-03` 
  - feat: 增加富文本组件 [#7586c31](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/7586c31) `2023-12-21` 

- image
  - feat: ✨增加sdk触发方法 [#42a5be3](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/42a5be3) `2024-06-26` 
  - feat: ✨新增图片预览组件 [#5e5fd82](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/5e5fd82) `2024-06-26` 

- card
  - feat: ✨新增图片预览组件 [#5e5fd82](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/5e5fd82) `2024-06-26` 
  - feat: ✨卡片组件 [#e9c7c57](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/e9c7c57) `2024-02-19` 

- eye-text
  - feat: ✨新增图片预览组件 [#5e5fd82](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/5e5fd82) `2024-06-26` 
  - feat: 增加密文组件 [#7ed2cdc](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/7ed2cdc) `2024-01-16` 

- table
  - feat: ✨重构表格column组建，兼容所有ColumnProps, ColumnGroupProps，支持多级表头 [#d64649a](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/d64649a) `2024-05-24` 
  - feat: ✨增加商品信息组件展示 [#1a2e8dd](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/1a2e8dd) `2024-02-27` 
  - feat: ✨表格组件 [#2663f21](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/2663f21) `2024-02-22` 

- cover-text
  - feat: ✨增进CoverText组建 [#64e67ad](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/64e67ad) `2024-05-15` 

- card-num-input
  - feat: ✨增加自定义预览 [#8a1f29c](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/8a1f29c) `2024-04-23` 
  - feat: ✨更新showAllText字段为showEyeText并调整其逻辑 [#f046499](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/f046499) `2024-04-23` 
  - feat: ✨增加银行卡输入组件 [#4a60047](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/4a60047) `2024-04-18` 

- phone-input
  - feat: ✨增加自定义预览 [#8a1f29c](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/8a1f29c) `2024-04-23` 
  - feat: ✨更新showAllText字段为showEyeText并调整其逻辑 [#f046499](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/f046499) `2024-04-23` 
  - feat: ✨新增手机号输入组件 [#2bab0a7](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/2bab0a7) `2024-01-17` 

- button-group
  - feat: ✨ButtonGroup更多按钮增加loading [#71abc8a](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/71abc8a) `2024-04-11` 
  - feat: ✨ButtonGroup增加moreBtnPopupClassName样式 [#67e4b50](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/67e4b50) `2024-04-11` 
  - feat: ✨按钮组增加折叠隐藏功能 [#99bffec](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/99bffec) `2024-02-23` 
  - feat: ✨增加按钮组组件 [#eba1c5a](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/eba1c5a) `2024-02-19` 

- batch-input
  - feat: ✨批量输入组件增加值转换功能 [#9383a91](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/9383a91) `2024-04-07` 
  - feat: ✨新增批量输入组件 [#0d8c2c7](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/0d8c2c7) `2024-04-07` 

- tooltip
  - feat: ✨增加自定义提示或icon支持 [#4f86bc1](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/4f86bc1) `2024-02-28` 
  - feat: ✨tooltip增加下划线展示样式 [#a4f9129](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/a4f9129) `2024-02-22` 
  - feat: ✨新增Tooltip文字提示组件 [#8727bef](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/8727bef) `2024-02-19` 

- state-label
  - feat: ✨增加状态标签组件 [#64acdde](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/64acdde) `2024-02-27` 

- progress
  - feat: ✨增加进度条组件 [#9f67104](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/9f67104) `2024-02-27` 

- copy-text
  - feat: ✨文本超长展示省略号 [#f9dbe73](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/f9dbe73) `2024-02-23` 
  - feat: ✨新增文本复制组件 [#47bf9ce](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/47bf9ce) `2024-02-23` 

- statistic
  - feat: ✨增加额外信息展示 [#6423f3a](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/6423f3a) `2024-02-20` 
  - feat: ✨数据指标组件 [#376074a](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/376074a) `2024-02-20` 

- money-value
  - feat: ✨金额展示组件 [#e750023](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/e750023) `2024-02-19` 

- confirm-btn
  - feat: ✨增加 ConfirmBtn 组建 [#b354514](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/b354514) `2024-02-19` 

- number-picker
  - fix: 🐛增加数字输入组建 [#867267d](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/867267d) `2024-02-02` 

- password-input
  - fix: 🐛增加数字输入组建 [#867267d](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/867267d) `2024-02-02` 
  - feat: 增加富文本组件 [#7586c31](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/7586c31) `2023-12-21` 
  - feat: 示例问题修改 [#47c2fcf](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/47c2fcf) `2023-12-20` 
  - feat: ✨加入PasswordInput组建 [#bfdc594](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/bfdc594) `2023-12-19` 

- otp-input
  - feat: ✨新增otp组件 [#f8f695b](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/f8f695b) `2024-01-30` 

- Uploader
  - feat: ✨增加文件预览处理 [#f8fd804](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/f8fd804) `2024-01-19` 
  - feat: ✨文件上传组件 [#b5c21c0](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/b5c21c0) `2024-01-19` 

- skeleton
  - feat: 移除了skeleton示例组件 [#872d38c](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/872d38c) `2024-01-16` 
  - feat: 增加富文本组件 [#7586c31](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/7586c31) `2023-12-21` 
  - feat: 示例问题修改 [#47c2fcf](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/47c2fcf) `2023-12-20` 
  - feat: 删除测试文件 [#4e6fc20](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/4e6fc20) `2023-11-29` 
  - feat: 组件文档样式调整 [#04c709d](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/04c709d) `2023-11-29` 
  - feat: 组件文档样式调整 [#553c892](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/553c892) `2023-11-29` 
  - feat: 主题 [#8c2f8dc](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/8c2f8dc) `2023-11-28` 
  - feat: docs [#48b48d6](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/48b48d6) `2023-11-28` 

- overview
  - feat: docs [#48b48d6](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/48b48d6) `2023-11-28` 



---
## aepay-utils
- locale
  - feat: ✨locale增加alias高阶用法 [#13f4626](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/13f4626) `2024-01-18` 
  - feat: ✨多语言支持按key匹配参数 [#c46e928](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/c46e928) `2024-01-18` 
  - feat: 多语言支持变量 + 人脸识别联调 [#c27a145](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/c27a145) `2024-01-08` 
  - feat: 多语言文案配置 [#601d7ae](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/601d7ae) `2024-01-03` 

- mtop
  - feat: 添加了mtop请求拦截器 [#c320d05](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/c320d05) `2024-01-16` 
  - feat: 补充文档 [#964b03f](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/964b03f) `2024-01-09` 

- logger
  - feat: 补充logger文档 [#1069713](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/1069713) `2024-01-11` 
  - feat: 文档更新 [#ab5fe5d](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/ab5fe5d) `2023-12-21` 

- cache
  - feat: 补充文档 [#2a2e20f](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/2a2e20f) `2024-01-09` 

- time
  - feat: 时间工具类 [#a02e209](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/a02e209) `2023-12-26` 

- cookie
  - feat: 文档更新 [#ab5fe5d](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/ab5fe5d) `2023-12-21` 
  - feat: 更新文档 [#42a82ab](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/42a82ab) `2023-12-21` 



---
## ekyc-face
- real-id
  - feat: ✨增加后置扫脸兼容（新增onlyShowFace字段仅展示扫脸部分） [#15ed2a2](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/15ed2a2) `2024-04-03` 
  - feat: 人脸识别文档补充 [#004d39f](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/004d39f) `2024-01-12` 
  - feat: 设置租户信息 [#28e71de](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/28e71de) `2024-01-12` 
  - feat: 扫脸重试逻辑调整 [#730f6f7](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/730f6f7) `2024-01-12` 
  - feat: 示例文档补充 [#eb933f4](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/eb933f4) `2024-01-10` 
  - feat: 用户主动取消联调 [#48327e4](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/48327e4) `2024-01-10` 
  - feat: 降级弹框文档补充 [#745f508](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/745f508) `2024-01-09` 
  - feat: 多语言文案配置 [#601d7ae](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/601d7ae) `2024-01-03` 
  - feat: 人脸识别sdk [#5986d15](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/5986d15) `2024-01-02` 
  - feat: 人脸识别sdk [#2691e82](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/2691e82) `2024-01-02` 
  - feat: 人脸识别组件 [#06f9bc6](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/06f9bc6) `2023-12-27` 
  - feat: 人脸识别组件 [#bef79e9](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/bef79e9) `2023-12-27` 
  - feat: 增加人脸识别组件 [#82a3af9](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/82a3af9) `2023-12-26` 



---
