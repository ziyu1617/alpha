/* ══════════════════════════════════════════════════════════════════
   alpha — Elsewhere 页数据（日常编辑这里即可）

   加一组相册 = 往 GALLERIES 加一个对象：
     { id: "唯一英文 id", title: "链接文字", photos: [{ src, alt }, …] }
   图片文件放进 public/elsewhere/ 目录，src 写 "/elsewhere/文件名"。
   ══════════════════════════════════════════════════════════════════ */

export interface ElsewherePhoto {
  /** public/ 下的路径，如 "/elsewhere/wales-01.jpg" */
  src: string;
  /** 无障碍描述 */
  alt: string;
}

export interface ElsewhereGallery {
  id: string;
  /** 页面上显示的链接文字 */
  title: string;
  photos: ElsewherePhoto[];
}

/** 页面中央的图 */
export const CENTER_IMAGE: ElsewherePhoto = {
  src: "/elsewhere/center.webp",
  alt: "夜里花店的橱窗",
};

export const GALLERIES: ElsewhereGallery[] = [
  {
    id: "wales-west-sea",
    title: "威尔士最西边的海",
    photos: [
      { src: "/elsewhere/wales-01.jpg", alt: "海边步道，远处的栈桥与山" },
      { src: "/elsewhere/wales-02.jpg", alt: "护栏外安静的海面" },
      { src: "/elsewhere/wales-03.jpg", alt: "暮色里亮着灯的灯塔" },
      { src: "/elsewhere/wales-04.jpg", alt: "云隙光洒在入海口" },
    ],
  },
  // ✎ 之后的相册往下加：
  // { id: "…", title: "…", photos: [{ src: "/elsewhere/….jpg", alt: "…" }] },
];
