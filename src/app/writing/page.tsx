import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Decor } from "@/components/decor";
import { Sprite } from "@/components/sprite";
import { DECOR } from "@/data/decor";

export const metadata: Metadata = {
  title: "Writing — alpha",
  description: "alpha · 札记 · 长文 · 碎想",
};

export default function WritingPage() {
  return (
    <main className="sheet">
      <Decor spec={DECOR.writing} />

      <div className="content">
        <header className="head">
          <p className="kicker">
            <Link className="back" href="/">
              ← alpha
            </Link>{" "}
            <span>·</span> <b>写作</b> <span className="cjk">/ writing</span>
          </p>
          <h1
            className="wordmark wm-underline"
            style={{ "--accent": "var(--green)" } as CSSProperties}
          >
            Writing
          </h1>
          <span
            className="burst"
            style={{ top: "2%", right: "6%", width: 44, "--d": "0.34s" } as CSSProperties}
            aria-hidden="true"
          >
            <Sprite id="bang" rotate={-8} />
          </span>
          <p className="subtitle">
            <span className="cjk">札记 · 长文 · 碎想</span>
            <span className="dot">·</span>
            <span className="cjk">notes, essays &amp; fragments</span>
          </p>
        </header>

        {/* ✎ 正文区（留空）：要发文章时在这里加内容，可照搬首页的 LinkChip 卡片，或做成一列「标题 + 日期」 */}

        <footer className="foot">
          <span>
            <b>self-published</b> · alpha · MMXXVI
          </span>
          <Link className="back back--foot" href="/">
            ← 返回首页 back to index
          </Link>
        </footer>
      </div>
    </main>
  );
}
