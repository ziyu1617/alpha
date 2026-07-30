import { SPRITE_SYMBOLS } from "./sprite-symbols";

/** 所有可用的 symbol id（不含 "s-" 前缀） */
export type SpriteId =
  | "cross"
  | "cross-hole"
  | "plus"
  | "ring"
  | "sq"
  | "x"
  | "chev"
  | "flower"
  | "star"
  | "scatter"
  | "bang";

/** 13×13 的大尺寸 symbol，其余均为 11×11 */
const WIDE_SPRITES: ReadonlySet<SpriteId> = new Set(["bang", "scatter"]);

export function isWideSprite(id: SpriteId): boolean {
  return WIDE_SPRITES.has(id);
}

/** 隐藏的 symbol 定义库，放在 layout 里全局注入一次 */
export function SpriteDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs dangerouslySetInnerHTML={{ __html: SPRITE_SYMBOLS }} />
    </svg>
  );
}

/** 引用精灵图 symbol 的一个 <svg> 实例 */
export function Sprite({ id, rotate }: { id: SpriteId; rotate?: number }) {
  const size = isWideSprite(id) ? 13 : 11;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <use href={`#s-${id}`} />
    </svg>
  );
}
