import { CornerLinks } from "@/components/corner-links";
import { GalleryLinks } from "@/components/gallery-links";
import { IndexLinks } from "@/components/index-links";
import { CENTER_IMAGE, GALLERIES } from "@/data/elsewhere";
import { CORNER_LINKS, LINKS } from "@/data/links";
import { asset } from "@/lib/asset";

export default function HomePage() {
  return (
    <main className="page">
      <header className="page__top">
        <div className="page__brand">
          <span>alpha</span>
          <pre className="page__ascii" aria-hidden="true">{`(\\(\\
( -.-)
o_(")(")`}</pre>
        </div>
        <p className="page__tag">elsewhere · 在别处</p>
      </header>

      {/* 居中插画，链接分区环绕两侧（参考 collage 式索引排版） */}
      <div className="page__stage">
        <aside className="page__col page__col--left">
          <section>
            <h2 className="page__h">Links 链接</h2>
            <IndexLinks links={LINKS} spaced />
          </section>
        </aside>

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

        <span aria-hidden="true" />
      </div>

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
        <span>alpha · elsewhere · MMXXVI · self-published</span>
        <CornerLinks links={CORNER_LINKS} />
      </footer>
    </main>
  );
}
