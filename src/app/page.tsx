import { IndexLinks } from "@/components/index-links";
import { LINKS } from "@/data/links";

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
        <p className="page__tag">个人索引 · personal index</p>
      </header>

      <div className="page__sections">
        <section>
          <h2 className="page__h">Information 关于</h2>
          <p className="page__note">
            粉色弗洛 · pf
            <br />
            selected links, works &amp; whereabouts
          </p>
        </section>
        <section>
          <h2 className="page__h">Links 链接</h2>
          <IndexLinks links={LINKS} />
        </section>
      </div>

      <footer className="page__foot">
        <span>alpha · MMXXVI · self-published</span>
        <span>@alpha</span>
      </footer>
    </main>
  );
}
