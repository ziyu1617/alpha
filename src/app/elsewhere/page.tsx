import type { Metadata } from "next";
import Link from "next/link";

import { GalleryLinks } from "@/components/gallery-links";
import { CENTER_IMAGE, GALLERIES } from "@/data/elsewhere";
import { asset } from "@/lib/asset";

import "./elsewhere.css";

export const metadata: Metadata = {
  title: "Elsewhere — alpha",
  description: "alpha · 在别处 / off the index",
};

export default function ElsewherePage() {
  return (
    <main className="else">
      <header className="else__top">
        <div className="else__brand">
          <Link href="/">← alpha</Link>
          <pre className="else__ascii" aria-hidden="true">{`(\\(\\
( -.-)
o_(")(")`}</pre>
        </div>
        <p className="else__tag">elsewhere · 在别处</p>
      </header>

      <figure className="else__center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(CENTER_IMAGE.src)}
          alt={CENTER_IMAGE.alt}
          width={2000}
          height={1311}
        />
        <figcaption>perception, in passing</figcaption>
      </figure>

      <div className="else__sections">
        <section>
          <h2 className="else__h">Sea 看过的海</h2>
          <GalleryLinks galleries={GALLERIES} />
        </section>
        <section>
          <h2 className="else__h">Upcoming 慢慢补充</h2>
          <p className="else__note">( more places &amp; pictures soon )</p>
        </section>
      </div>

      <footer className="else__foot">
        <span>alpha · elsewhere · MMXXVI</span>
        <span>self-published</span>
      </footer>
    </main>
  );
}
