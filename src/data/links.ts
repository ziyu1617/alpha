/* ══════════════════════════════════════════════════════════════════
   alpha — 链接数据（日常唯一需要编辑的文件）
   加一个链接 = 加一个对象；删掉即消失；编号 01/02/… 自动生成。
   ══════════════════════════════════════════════════════════════════ */

export interface LinkItem {
  /** 链接文字 */
  name: string;
  /** 目标网址；站内页面用 "/archive" 这类路径 */
  href: string;
  /** 链接后面的灰色小字（网址 / 说明） */
  meta: string;
  /** 可选：点击时复制这段文字而不是跳转（用于邮箱） */
  copy?: string;
  /** 可选：无障碍名称，默认用 name */
  label?: string;
}

export const LINKS: LinkItem[] = [
  {
    name: "GitHub",
    href: "https://github.com/ziyu1617",
    meta: "github.com/ziyu1617",
  },
  {
    name: "Email",
    href: "mailto:zhangziyu0025@outlook.com",
    copy: "zhangziyu0025@outlook.com",
    meta: "zhangziyu0025@outlook.com",
    label: "复制邮箱 copy email",
  },
  {
    name: "Portfolio",
    href: "https://www.figma.com/deck/MxWdGYmXWAMTdWHdWmxHxM/AI%E4%BA%A7%E5%93%81%E7%BB%8F%E7%90%86%E4%BD%9C%E5%93%81%E9%9B%86_%E5%BC%A0%E5%AD%90%E7%8E%89_v0.1?node-id=5-696&t=UQST8dB9MMErpvNr-1",
    meta: "主作品 · figma.com",
  },
  {
    name: "Archive",
    href: "/archive",
    meta: "/journal",
  },
  {
    name: "Music",
    href: "https://y.music.163.com/m/user?id=475072461&dlt=0846&app_version=9.5.35",
    meta: "music.163.com",
  },
  {
    name: "Elsewhere",
    href: "/elsewhere",
    meta: "perception",
  },
];
