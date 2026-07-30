import type { CSSProperties } from "react";

import type { DecorSpec } from "@/data/decor";
import { Sprite } from "@/components/sprite";
import { cn } from "@/lib/utils";

/* 装饰层：虚线轨迹 + 散落的像素花（永不阻挡点击） */
export function Decor({ spec }: { spec: DecorSpec }) {
  return (
    <div className="deco" aria-hidden="true">
      <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {spec.lines.map((line, i) => (
          <path
            key={i}
            d={line.d}
            stroke={`var(--${line.stroke})`}
            strokeDasharray={line.dash}
          />
        ))}
      </svg>
      {spec.bursts.map((burst, i) => (
        <span
          key={i}
          className={cn("burst", burst.hideSm && "hide-sm")}
          style={
            {
              ...burst.pos,
              width: burst.width,
              color: burst.color ? `var(--${burst.color})` : undefined,
              "--d": `${burst.delay}s`,
            } as CSSProperties
          }
        >
          <Sprite id={burst.sprite} rotate={burst.rotate} />
        </span>
      ))}
    </div>
  );
}
