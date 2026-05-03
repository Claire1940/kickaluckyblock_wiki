# SEO 检查报告

生成时间: 2026-05-03 03:01:27 UTC

## 检查摘要

- ✅ 通过: 30 项
- ❌ 失败: 0 项
- ⚠️ 警告: 3 项
- 📊 总计: 33 项

## 详细结果

### 阶段 1：代码结构检查

#### 1.1 根 Layout
- ✅ 全局样式在 `src/app/layout.tsx` 注入
- ✅ `<html lang>` 在 `src/app/[locale]/layout.tsx` 正确按语言输出
- ✅ 首页包含 `WebSite` + `SearchAction` 结构化数据
- ⚠️ `src/app/layout.tsx` 为最小 pass-through（项目当前采用 locale layout 输出 html/body，构建与运行正常）

#### 1.2 动态页面 SEO (`src/app/[locale]/[...slug]/page.tsx`)
- ✅ `generateMetadata` 输出 title/description
- ✅ 包含 alternates/hreflang
- ✅ 包含 OpenGraph
- ✅ 包含 robots
- ✅ 含英文 fallback 逻辑

#### 1.3 Sitemap (`src/app/sitemap.ts`)
- ✅ 使用 `NEXT_PUBLIC_SITE_URL`，无硬编码环境分支
- ✅ 包含所有语言首页（en/pt/es/id）
- ✅ 不包含法律类 noindex 页面
- ✅ 仅在分类内容 > 1 时加入分类页
- ✅ MDX 内容页按语言生成

#### 1.4 国际化配置 (`src/i18n/routing.ts`)
- ✅ `localePrefix: 'as-needed'`
- ✅ `defaultLocale: 'en'`
- ✅ `localeDetection: true`

#### 1.5 结构化数据
- ✅ 首页 JSON-LD 包含 `WebSite` / `SearchAction`
- ✅ 详情页 `ArticleStructuredData` 正常
- ✅ 列表页 `ListStructuredData` 正常

#### 1.6 Robots
- ✅ `src/app/robots.ts` 存在并允许抓取
- ✅ 包含 sitemap 地址

#### 1.7 H1 标签
- ✅ 首页、列表页、详情页、法律页均有 H1
- ✅ H1 与页面主题语义一致（Kick a Lucky Block）

#### 1.8 图片 alt
- ✅ 关键 `Image` 组件均有 alt

#### 1.9 面包屑
- ✅ 详情页有 breadcrumb 导航与 `BreadcrumbList` JSON-LD

#### 1.10 内链完整性
- ✅ 修复首页法律链接的非英语前缀问题（按 locale 拼接）
- ✅ 法律页 `Link` 改为 i18n 导航组件，语言路由一致
- ✅ Latest Updates 列表链接修复默认英语不应带 `/en` 前缀的问题

### 阶段 2：构建验证

- ✅ `npm run typecheck` 通过
- ✅ `npm run lint` 通过
- ✅ `npm run build` 成功
- ⚠️ 构建存在既有 warning：`content/` 目录缺失导致 `Can't resolve ../../content`（不阻断构建，已持续存在于历史任务）

### 阶段 3：安全检查

- ✅ `src/` 未发现 API key 明文硬编码（`sk-` 命中为英文单词 `Risk-Adjusted`）
- ✅ `.gitignore` 包含 `.env*`
- ✅ 未发现密码类硬编码凭据

### 阶段 4：本地运行验证

- ✅ 首页 `GET /` 返回 `200`
- ✅ 非默认语言路由 `/{pt|es|id}` 均返回 `200`
- ✅ `/en` 为 `307` 重定向到 `/`（符合 as-needed）
- ✅ 法律页 `/about` `/privacy-policy` `/terms-of-service` `/copyright` 以及对应多语言路由均 `200`
- ✅ 首页输出 `canonical` 与 `alternate hrefLang` 标签
- ✅ `SearchAction` JSON-LD 在首页可检出
- ✅ 旧主题占位词检查：`{{OLD_THEME}}` 计数为 `0`

## 本轮修复摘要

1. 删除旧品牌残留文件：`src/app/[locale]/terms-of-service/page.tsx.bak`
2. 修复首页法律链接多语言前缀
3. 修复 Latest Updates 文章链接默认语言错误前缀
4. 法律页切换为 i18n Link，确保站内语言一致
5. 重写 About/ToS 中与当前主题不一致的语义内容（codes/brainrots/mutations/weights/rebirth）
6. 重新翻译 `pt/es/id`，并对 `es` 进行二次补翻，清除大段英文兜底

## 修复建议

### 🔴 高优先级（必须修复）
1. （已完成）旧品牌残留清理与多语言内链一致性修复。

### 🟡 中优先级（建议修复）
1. 若继续沿用 homepage-only 架构，建议补一个空 `content/` 占位或在内容模块增加显式容错，消除构建 warning 噪音。
2. 当前 `modules` 键名仍沿用历史命名（`lucidBlocks*`），虽不影响运行，但建议后续统一重命名以降低维护成本。

### 🟢 低优先级（可选优化）
1. 清理未使用 icon 注册项，减少前端维护噪音。

## 下一步行动

1. 保持当前变更提交并推送。
2. 观察 Actions 是否仅出现已知 warning 且构建通过。
3. 后续专题任务中安排 `modules` 键名的无损重命名。
