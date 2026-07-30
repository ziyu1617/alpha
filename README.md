# alpha — the prelude of neon

个人索引页 · a personal index of links。杂志拼贴（zine collage）风格：印刷纸面、像素花、虚线轨迹。

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
│   ├── layout.tsx        # 根布局：字体、元信息、精灵图注入
│   ├── page.tsx          # 首页（链接索引）
│   ├── writing/page.tsx  # /writing 写作页
│   ├── globals.css       # Tailwind + shadcn 主题变量
│   └── zine.css          # 页面专属视觉（纸面 / 卡片 / 装饰）
├── components/
│   ├── ui/               # shadcn/ui 组件（button、tooltip…）
│   ├── link-chip.tsx     # 链接卡片（含点击复制）
│   ├── decor.tsx         # 装饰层（虚线 + 像素花）
│   ├── sprite.tsx        # 像素图标组件
│   └── sprite-symbols.ts # 像素图标 symbol 定义
├── data/
│   ├── links.ts          # ✎ 链接数据（日常唯一需要编辑的文件）
│   └── decor.ts          # ✎ 装饰层数据
└── lib/utils.ts          # shadcn 的 cn() 工具
```

## 怎么加一个链接

编辑 `src/data/links.ts`，往 `LINKS` 数组加一个对象即可，编号自动生成：

```ts
{
  name: "Blog",
  href: "https://blog.example.com",
  meta: "blog.example.com",
  accent: "teal",        // red | orange | green | teal | blue | purple | magenta …
  rot: -1,               // 卡片倾斜角度
  icon: "plus",          // 左上角像素图标
  spark: "sq",           // 右上角小装饰
},
```

外链自动新窗口打开；`href` 以 `/` 开头则走站内路由；加 `copy: "…"` 字段则点击变为复制（如邮箱卡片）。

## 添加 shadcn 组件

```bash
npx shadcn@latest add <component>
```
