import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Archive — alpha",
  description: "alpha · 札记 · 长文 · 碎想",
};

export default function ArchivePage() {
  return (
    <main className="page">
      <header className="page__top">
        <div className="page__brand">
          <Link href="/">← alpha</Link>
        </div>
        <p className="page__tag">archive · 归档</p>
      </header>

      <div className="page__sections">
        <section>
          <h2 className="page__h">Archive 归档</h2>
          <p className="page__note">札记 · 长文 · 碎想 · notes, essays &amp; fragments</p>
          {/* ✎ 要发文章时，把下面的占位换成「标题 + 日期」列表 */}
          <p className="page__note--dim">( nothing here yet · 慢慢来 )</p>
        </section>
      </div>

      <footer className="page__foot">
        <span>alpha · archive · MMXXVI</span>
        <Link href="/">← back to index 返回首页</Link>
      </footer>
    </main>
  );
}
