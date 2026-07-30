import type { NextConfig } from "next";

// 部署在 GitHub Pages 的 https://ziyu1617.github.io/alpha/ 子路径下：
// 静态导出到 out/，生产构建加 /alpha 前缀（本地 dev 仍在根路径）。
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/alpha" : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
