import type { SpriteId } from "@/components/sprite";

/* ══════════════════════════════════════════════════════════════════
   alpha — 链接数据（日常唯一需要编辑的文件）
   加一个链接 = 加一个对象；删掉即消失；编号 01/02/… 自动生成。
   ══════════════════════════════════════════════════════════════════ */

/** 主题色 token 名，对应 zine.css 里的 --red 等变量 */
export type AccentColor =
  | "red"
  | "crimson"
  | "orange"
  | "yellow"
  | "lime"
  | "green"
  | "teal"
  | "blue"
  | "purple"
  | "magenta"
  | "pink";

export interface LinkItem {
  /** 卡片大标题 */
  name: string;
  /** 目标网址；站内页面用 "/archive" 这类路径 */
  href: string;
  /** 编号后面的小字（网址 / 说明） */
  meta: string;
  /** 主题色 */
  accent: AccentColor;
  /** 卡片倾斜角度（deg），正负皆可 */
  rot: number;
  /** 左上角图标 */
  icon: SpriteId;
  /** 右上角小装饰图标 */
  spark: SpriteId;
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
    accent: "red",
    rot: -1.6,
    icon: "cross",
    spark: "x",
  },
  {
    name: "Email",
    href: "mailto:zhangziyu0025@outlook.com",
    copy: "zhangziyu0025@outlook.com",
    meta: "zhangziyu0025@outlook.com",
    accent: "green",
    rot: 1.3,
    icon: "ring",
    spark: "plus",
    label: "复制邮箱 copy email",
  },
  {
    name: "Portfolio",
    href: "https://www.figma.com/deck/MxWdGYmXWAMTdWHdWmxHxM/AI%E4%BA%A7%E5%93%81%E7%BB%8F%E7%90%86%E4%BD%9C%E5%93%81%E9%9B%86_%E5%BC%A0%E5%AD%90%E7%8E%89_v0.1?node-id=5-696&t=UQST8dB9MMErpvNr-1",
    meta: "主作品 · figma.com",
    accent: "orange",
    rot: -0.8,
    icon: "bang",
    spark: "cross",
  },
  {
    name: "Archive",
    href: "/archive",
    meta: "/journal",
    accent: "blue",
    rot: 1.8,
    icon: "flower",
    spark: "sq",
  },
  {
    name: "Music",
    href: "https://y.music.163.com/m/user?id=475072461&dlt=0846&app_version=9.5.35",
    meta: "music.163.com",
    accent: "magenta",
    rot: -1.2,
    icon: "star",
    spark: "cross-hole",
  },
  {
    name: "Elsewhere",
    href: "#",
    meta: "perception",
    accent: "purple",
    rot: 1,
    icon: "scatter",
    spark: "chev",
  },
];
