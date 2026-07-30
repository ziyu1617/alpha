import type { CSSProperties } from "react";

import { Decor } from "@/components/decor";
import { LinkChip } from "@/components/link-chip";
import { Sprite } from "@/components/sprite";
import { DECOR } from "@/data/decor";
import { LINKS } from "@/data/links";

export default function HomePage() {
  return (
    <main className="sheet">
      <Decor spec={DECOR.home} />

      <div className="content">
        <header className="head">
          <p className="kicker">
            <span>{"№ 01"}</span> — <b>个人索引</b>{" "}
            <span className="cjk">/ personal index</span>
          </p>
          <h1 className="wordmark">alpha</h1>
          <span
            className="burst"
            style={
              { top: "3%", right: "5%", width: 44, "--d": "0.34s" } as CSSProperties
            }
            aria-hidden="true"
          >
            <Sprite id="bang" rotate={-8} />
          </span>
          <p className="subtitle">
            <span className="cjk">粉色弗洛</span>
            <span className="dot">·</span>
            <span className="cjk">pf</span>
            <span className="sub2">selected links, works &amp; whereabouts</span>
          </p>
        </header>

        <nav className="links" aria-label="Links">
          {LINKS.map((link, index) => (
            <LinkChip key={link.name} link={link} index={index} />
          ))}
        </nav>

        <footer className="foot">
          <span>
            <b>self-published</b> · alpha · MMXXVI · set in Syne &amp;{" "}
            {"Space Mono"}
          </span>
          <span className="sig">@alpha</span>
        </footer>
      </div>
    </main>
  );
}
