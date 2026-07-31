import type { Metadata } from "next";
import Link from "next/link";

import { GalleryLinks } from "@/components/gallery-links";
import { CENTER_IMAGE, GALLERIES } from "@/data/elsewhere";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Elsewhere — alpha",
  description: "alpha · 在别处 / off the index",
};

export default function ElsewherePage() {
  return (
    <main className="page">
      <header className="page__top">
        <div className="page__brand">
          <Link href="/">← alpha</Link>
          <pre className="page__ascii" aria-hidden="true">{`(\\(\\
( -.-)
o_(")(")`}</pre>
        </div>
        <p className="page__tag">elsewhere · 在别处</p>
      </header>

      <figure className="page__center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(CENTER_IMAGE.src)}
          alt={CENTER_IMAGE.alt}
          width={2000}
          height={1311}
        />
        <figcaption>perception, in passing</figcaption>
      </figure>

      <div className="page__sections">
        <section>
          <h2 className="page__h">Sea 看过的海</h2>
          <GalleryLinks galleries={GALLERIES} />
        </section>
        <section>
          <h2 className="page__h">Upcoming 慢慢补充</h2>
          <p className="page__note">( more places &amp; pictures soon )</p>
        </section>
      </div>

      <footer className="page__foot">
        <span>alpha · elsewhere · MMXXVI</span>
        <span>self-published</span>
      </footer>
    </main>
  );
}
