/**
 * public/ 下静态资源的 URL。
 * 部署在 GitHub Pages 的 /alpha 子路径下时自动加前缀（本地 dev 无前缀）。
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
