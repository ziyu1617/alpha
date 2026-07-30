import type { SpriteId } from "@/components/sprite";
import type { AccentColor } from "./links";

/* ══════════════════════════════════════════════════════════════════
   alpha — 装饰层数据：虚线轨迹 + 散落的像素花
   想增删装饰、挪位置，改这里即可。
   ══════════════════════════════════════════════════════════════════ */

export interface LineSpec {
  /** SVG path（viewBox 0 0 100 100，坐标略出界让线穿透纸面） */
  d: string;
  /** 颜色 token 名 */
  stroke: AccentColor;
  /** stroke-dasharray */
  dash: string;
}

export interface BurstSpec {
  sprite: SpriteId;
  /** 定位（百分比字符串），如 { top: "6%", left: "6%" } */
  pos: Partial<Record<"top" | "left" | "right" | "bottom", string>>;
  /** 宽度 px */
  width: number;
  /** 入场动画延迟（秒） */
  delay: number;
  /** 单色 sprite 的颜色；多色 sprite（flower/star/scatter/bang）留空 */
  color?: AccentColor;
  /** 旋转角度（deg） */
  rotate?: number;
  /** 小屏隐藏 */
  hideSm?: boolean;
}

export interface DecorSpec {
  lines: LineSpec[];
  bursts: BurstSpec[];
}

export const DECOR = {
  home: {
    lines: [
      { d: "M -4 20 L 104 41", stroke: "red", dash: "9 6" },
      { d: "M 12 -4 L 64 104", stroke: "blue", dash: "1.4 6" },
      { d: "M 104 9 L -4 72", stroke: "green", dash: "1.4 6" },
      { d: "M -4 86 L 104 67", stroke: "magenta", dash: "8 6" },
      { d: "M 36 -4 L 58 104", stroke: "teal", dash: "1.4 7" },
    ],
    bursts: [
      { sprite: "cross", pos: { top: "6%", left: "6%" }, width: 30, delay: 0.1, color: "red", rotate: 6 },
      { sprite: "flower", pos: { top: "14%", left: "30%" }, width: 40, delay: 0.18, rotate: -4, hideSm: true },
      { sprite: "star", pos: { top: "5%", right: "8%" }, width: 46, delay: 0.22, rotate: 12 },
      { sprite: "ring", pos: { top: "30%", right: "4%" }, width: 26, delay: 0.3, color: "blue", hideSm: true },
      { sprite: "plus", pos: { top: "44%", left: "2%" }, width: 22, delay: 0.34, color: "green", rotate: 8, hideSm: true },
      { sprite: "bang", pos: { top: "52%", left: "46%" }, width: 52, delay: 0.4, rotate: -6, hideSm: true },
      { sprite: "scatter", pos: { top: "64%", right: "10%" }, width: 34, delay: 0.46, rotate: 10, hideSm: true },
      { sprite: "cross-hole", pos: { bottom: "14%", left: "8%" }, width: 30, delay: 0.5, color: "magenta", hideSm: true },
      { sprite: "x", pos: { bottom: "8%", right: "24%" }, width: 24, delay: 0.54, color: "orange", rotate: -10, hideSm: true },
      { sprite: "flower", pos: { bottom: "6%", right: "6%" }, width: 36, delay: 0.58, rotate: 4 },
      { sprite: "sq", pos: { top: "74%", left: "28%" }, width: 20, delay: 0.6, color: "teal", hideSm: true },
    ],
  },
  writing: {
    lines: [
      { d: "M -4 24 L 104 38", stroke: "red", dash: "9 6" },
      { d: "M 18 -4 L 70 104", stroke: "blue", dash: "1.4 6" },
      { d: "M 104 14 L -4 66", stroke: "green", dash: "1.4 6" },
      { d: "M -4 82 L 104 72", stroke: "magenta", dash: "8 6" },
      { d: "M 44 -4 L 60 104", stroke: "teal", dash: "1.4 7" },
    ],
    bursts: [
      { sprite: "cross", pos: { top: "6%", left: "5%" }, width: 30, delay: 0.1, color: "red", rotate: 6 },
      { sprite: "star", pos: { top: "5%", right: "8%" }, width: 46, delay: 0.22, rotate: 12 },
      { sprite: "ring", pos: { top: "34%", right: "5%" }, width: 26, delay: 0.3, color: "blue", hideSm: true },
      { sprite: "plus", pos: { top: "62%", left: "4%" }, width: 22, delay: 0.34, color: "green", rotate: 8, hideSm: true },
      { sprite: "cross-hole", pos: { bottom: "16%", left: "10%" }, width: 30, delay: 0.5, color: "magenta", hideSm: true },
      { sprite: "x", pos: { bottom: "10%", right: "22%" }, width: 24, delay: 0.54, color: "orange", rotate: -10, hideSm: true },
      { sprite: "flower", pos: { bottom: "7%", right: "7%" }, width: 34, delay: 0.58, rotate: 4 },
    ],
  },
} satisfies Record<string, DecorSpec>;
