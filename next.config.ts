import type { NextConfig } from "next";

// 部署在 GitHub Pages 的 https://ziyu1617.github.io/alpha/ 子路径下：
// 静态导出到 out/，生产构建加 /alpha 前缀（本地 dev 仍在根路径）。
const isProd = process.env.NODE_ENV === "production";

const basePath = isProd ? "/alpha" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  // public/ 下静态资源需要手动带上 basePath（见 src/lib/asset.ts）
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
