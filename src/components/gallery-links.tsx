"use client";

import { useCallback, useEffect, useState } from "react";

import type { ElsewhereGallery } from "@/data/elsewhere";
import { asset } from "@/lib/asset";

/* 相册链接列表 + 点击后的浮层查看器（一次浏览一张，可前后翻页） */

interface ViewerState {
  gallery: ElsewhereGallery;
  index: number;
}

export function GalleryLinks({ galleries }: { galleries: ElsewhereGallery[] }) {
  const [viewer, setViewer] = useState<ViewerState | null>(null);

  const close = useCallback(() => setViewer(null), []);

  const step = useCallback((delta: number) => {
    setViewer((v) => {
      if (!v) return v;
      const count = v.gallery.photos.length;
      return { ...v, index: (v.index + delta + count) % count };
    });
  }, []);

  // 键盘：Esc 关闭，← → 翻页；浮层打开时锁定页面滚动
  useEffect(() => {
    if (!viewer) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft" || e.key === "Left") step(-1);
      else if (e.key === "ArrowRight" || e.key === "Right") step(1);
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [viewer, close, step]);

  return (
    <>
      <ul className="else__list">
        {galleries.map((gallery) => (
          <li key={gallery.id}>
            <button
              type="button"
              className="else__link"
              onClick={() => setViewer({ gallery, index: 0 })}
            >
              {gallery.title}
            </button>{" "}
            <span className="else__count">( {gallery.photos.length} )</span>
          </li>
        ))}
      </ul>

      {viewer && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={viewer.gallery.title}
          onClick={close}
        >
          <figure
            className="lightbox__stage"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="lightbox__img"
              src={asset(viewer.gallery.photos[viewer.index].src)}
              alt={viewer.gallery.photos[viewer.index].alt}
            />
            <figcaption className="lightbox__caption">
              {viewer.gallery.title} · {viewer.index + 1} /{" "}
              {viewer.gallery.photos.length}
            </figcaption>
          </figure>

          {viewer.gallery.photos.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                aria-label="上一张 previous"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                aria-label="下一张 next"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
              >
                ›
              </button>
            </>
          )}

          <button
            type="button"
            className="lightbox__close"
            aria-label="关闭 close"
            onClick={close}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
