"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";

/*
 * 首页整体背景的立方体特效。
 * 改编自 react-bits 的 Cubes（https://reactbits.dev/animations/cubes）：
 * 原版是固定 N×N 的正方形场景、监听自身指针事件；这里改为铺满视口的
 * cols×rows 网格、监听 window 事件（层本身 pointer-events:none，不挡点击），
 * 配色收敛到站内语言：白面、浅灰描边、点击时淡蓝涟漪。
 */

const CELL_PX = 72;          // 目标格子边长
const MAX_ANGLE = 38;        // 指针附近的最大翻转角
const RADIUS = 3;            // 影响半径（格）
const ENTER_DUR = 0.3;
const LEAVE_DUR = 0.6;
const RIPPLE_SPEED = 2;
const RIPPLE_COLOR = "#ffffff"; // 涟漪：白光扫过极光面
const WANDER_SPEED = 0.045;     // 闲置游走速度

/** 按网格位置取极光色相：绿 → 青 → 蓝 → 紫 → 品红 的斜向色带 */
function auroraHue(row: number, col: number, grid: GridSize): number {
  return 130 + (col / grid.cols) * 120 + (row / grid.rows) * 70;
}

interface GridSize {
  cols: number;
  rows: number;
}

export function CubesBg() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userActiveRef = useRef(false);
  const simPosRef = useRef({ x: 0, y: 0 });
  const simTargetRef = useRef({ x: 0, y: 0 });
  const simRAFRef = useRef<number | null>(null);
  const reducedRef = useRef(false);

  const [grid, setGrid] = useState<GridSize | null>(null);

  // 视口尺寸 → 网格行列数
  useEffect(() => {
    function measure() {
      setGrid({
        cols: Math.ceil(window.innerWidth / CELL_PX),
        rows: Math.ceil(window.innerHeight / CELL_PX),
      });
    }
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const tiltAt = useCallback((rowCenter: number, colCenter: number) => {
    if (!sceneRef.current) return;
    sceneRef.current
      .querySelectorAll<HTMLDivElement>(".cube")
      .forEach((cube) => {
        const r = +cube.dataset.row!;
        const c = +cube.dataset.col!;
        const dist = Math.hypot(r - rowCenter, c - colCenter);
        if (dist <= RADIUS) {
          const pct = 1 - dist / RADIUS;
          const angle = pct * MAX_ANGLE;
          gsap.to(cube, {
            duration: ENTER_DUR,
            ease: "power3.out",
            overwrite: true,
            rotateX: -angle,
            rotateY: angle,
          });
        } else {
          gsap.to(cube, {
            duration: LEAVE_DUR,
            ease: "power3.out",
            overwrite: true,
            rotateX: 0,
            rotateY: 0,
          });
        }
      });
  }, []);

  const pointerToCell = useCallback(
    (clientX: number, clientY: number): { row: number; col: number } | null => {
      if (!sceneRef.current || !grid) return null;
      const rect = sceneRef.current.getBoundingClientRect();
      return {
        col: (clientX - rect.left) / (rect.width / grid.cols),
        row: (clientY - rect.top) / (rect.height / grid.rows),
      };
    },
    [grid],
  );

  const resetAll = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current
      .querySelectorAll<HTMLDivElement>(".cube")
      .forEach((cube) =>
        gsap.to(cube, {
          duration: LEAVE_DUR,
          rotateX: 0,
          rotateY: 0,
          ease: "power3.out",
        }),
      );
  }, []);

  // 指针跟随 + 点击涟漪（挂在 window 上，背景层不参与命中测试）
  useEffect(() => {
    if (!grid || reducedRef.current) return;

    function onPointerMove(e: PointerEvent) {
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      const cell = pointerToCell(e.clientX, e.clientY);
      if (!cell) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => tiltAt(cell.row, cell.col));
      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    }

    function onLeave() {
      resetAll();
    }

    function onClick(e: MouseEvent) {
      if (!sceneRef.current) return;
      const cell = pointerToCell(e.clientX, e.clientY);
      if (!cell) return;
      const rowHit = Math.floor(cell.row);
      const colHit = Math.floor(cell.col);

      const spreadDelay = 0.15 / RIPPLE_SPEED;
      const animDuration = 0.3 / RIPPLE_SPEED;
      const holdTime = 0.6 / RIPPLE_SPEED;

      const rings: Record<number, HTMLElement[]> = {};
      sceneRef.current
        .querySelectorAll<HTMLDivElement>(".cube")
        .forEach((cube) => {
          const r = +cube.dataset.row!;
          const c = +cube.dataset.col!;
          const ring = Math.round(Math.hypot(r - rowHit, c - colHit));
          if (!rings[ring]) rings[ring] = [];
          rings[ring].push(
            ...Array.from(cube.querySelectorAll<HTMLElement>(".cube-face")),
          );
        });

      Object.keys(rings)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach((ring) => {
          const delay = ring * spreadDelay;
          gsap.to(rings[ring], {
            backgroundColor: RIPPLE_COLOR,
            duration: animDuration,
            delay,
            ease: "power3.out",
          });
          gsap.to(rings[ring], {
            // 每个面回到自己的极光底色
            backgroundColor: (_i: number, target: HTMLElement) =>
              target.dataset.base!,
            duration: animDuration,
            delay: delay + animDuration + holdTime,
            ease: "power3.out",
          });
        });
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("click", onClick);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [grid, pointerToCell, tiltAt, resetAll]);

  // 无人操作时的自动游走
  useEffect(() => {
    if (!grid || reducedRef.current) return;
    simPosRef.current = {
      x: Math.random() * grid.cols,
      y: Math.random() * grid.rows,
    };
    simTargetRef.current = {
      x: Math.random() * grid.cols,
      y: Math.random() * grid.rows,
    };
    const speed = WANDER_SPEED;
    const loop = () => {
      if (!userActiveRef.current) {
        const pos = simPosRef.current;
        const tgt = simTargetRef.current;
        pos.x += (tgt.x - pos.x) * speed;
        pos.y += (tgt.y - pos.y) * speed;
        tiltAt(pos.y, pos.x);
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
          simTargetRef.current = {
            x: Math.random() * grid.cols,
            y: Math.random() * grid.rows,
          };
        }
      }
      simRAFRef.current = requestAnimationFrame(loop);
    };
    simRAFRef.current = requestAnimationFrame(loop);
    return () => {
      if (simRAFRef.current != null) cancelAnimationFrame(simRAFRef.current);
    };
  }, [grid, tiltAt]);

  return (
    <div className="cubes-bg" aria-hidden="true">
      {grid && (
        <div
          ref={sceneRef}
          className="cubes-bg__scene"
          style={{
            gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
            gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          }}
        >
          {Array.from({ length: grid.rows }).map((_, r) =>
            Array.from({ length: grid.cols }).map((__, c) => {
              const hue = auroraHue(r, c, grid);
              const front = `hsl(${hue.toFixed(1)} 100% 58%)`;
              const side = `hsl(${hue.toFixed(1)} 95% 44%)`;
              const face = (kind: string, base: string) => (
                <div
                  key={kind}
                  className={`cube-face cube-face--${kind}`}
                  data-base={base}
                  style={{ backgroundColor: base }}
                />
              );
              return (
                <div
                  key={`${r}-${c}`}
                  className="cube"
                  data-row={r}
                  data-col={c}
                >
                  {face("top", side)}
                  {face("bottom", side)}
                  {face("left", side)}
                  {face("right", side)}
                  {face("front", front)}
                </div>
              );
            }),
          )}
        </div>
      )}
    </div>
  );
}
