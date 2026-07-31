# alpha — the prelude of neon

个人索引页 · a personal index of links。极简留白风格：纯白纸面、细小等宽字、下划线链接、深色浮层看图。

在线地址：https://ziyu1617.github.io/alpha/

## 技术栈

- [Next.js](https://nextjs.org)（App Router + TypeScript）
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) 组件库
- 字体通过 `next/font` 自托管（Syne / Space Mono / Caveat）

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 本地开发 http://localhost:3000
npm run build      # 生产构建
npm start          # 运行生产构建
npm run lint       # ESLint 检查
```

## 目录结构

```
src/
├── app/
│   ├── layout.tsx          # 根布局：字体（Space Mono）、元信息
│   ├── page.tsx            # 首页（链接索引）
│   ├── archive/page.tsx    # /archive 归档页
│   ├── elsewhere/page.tsx  # /elsewhere 别处页（图 + 相册）
│   ├── globals.css         # Tailwind + shadcn 主题变量
│   └── site.css            # 全站设计语言（留白排版 + 照片浮层）
├── components/
│   ├── ui/                 # shadcn/ui 组件（button、tooltip…）
│   ├── index-links.tsx     # 首页链接列表（含点击复制邮箱）
│   └── gallery-links.tsx   # 相册链接 + 照片浮层查看器
├── data/
│   ├── links.ts            # ✎ 首页链接数据
│   └── elsewhere.ts        # ✎ Elsewhere 页相册数据
└── lib/
    ├── asset.ts            # public/ 资源的 basePath 前缀
    └── utils.ts            # shadcn 的 cn() 工具
```

## 怎么加一个链接

编辑 `src/data/links.ts`，往 `LINKS` 数组加一个对象即可，编号自动生成：

```ts
{
  name: "Blog",
  href: "https://blog.example.com",
  meta: "blog.example.com",
},
```

外链自动新窗口打开；`href` 以 `/` 开头则走站内路由；加 `copy: "…"` 字段则点击变为复制（如邮箱）。

## 怎么加一组相册（Elsewhere 页）

图片放进 `public/elsewhere/`，再编辑 `src/data/elsewhere.ts` 的 `GALLERIES`：

```ts
{
  id: "kyoto",
  title: "京都的雨",
  photos: [{ src: "/elsewhere/kyoto-01.jpg", alt: "…" }],
},
```

## 添加 shadcn 组件

```bash
npx shadcn@latest add <component>
```

## 部署

推送到 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）会自动
静态导出（`next.config.ts` 里 `output: "export"` + `basePath: "/alpha"`）并发布到
GitHub Pages：https://ziyu1617.github.io/alpha/ 。本地开发不带 `/alpha` 前缀。
