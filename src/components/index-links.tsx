"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LinkItem } from "@/data/links";

/* 首页链接列表：编号自动生成；带 copy 字段的项点击复制并显示反馈 */

const COPIED_FEEDBACK_MS = 1600;

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // 剪贴板 API 不可用（如非安全上下文）时退回 execCommand
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

function CopyLink({ link }: { link: LinkItem }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  function handleClick() {
    void copyText(link.copy!).then(() => {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(
        () => setCopied(false),
        COPIED_FEEDBACK_MS,
      );
    });
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="page__link"
              aria-label={link.label ?? link.name}
              onClick={handleClick}
            >
              {link.name}
            </button>
          </TooltipTrigger>
          <TooltipContent>点击复制 · click to copy</TooltipContent>
        </Tooltip>
      </TooltipProvider>{" "}
      <span className="page__meta" aria-live="polite">
        {copied ? (
          <span className="page__ok">✓ 已复制 · copied</span>
        ) : (
          <>— {link.meta}</>
        )}
      </span>
    </>
  );
}

export function IndexLinks({ links }: { links: LinkItem[] }) {
  return (
    <ul className="page__list">
      {links.map((link, index) => {
        const num = String(index + 1).padStart(2, "0");
        const internal = link.href.startsWith("/");
        return (
          <li key={link.name}>
            <span className="page__num">{num}</span>{" "}
            {link.copy ? (
              <CopyLink link={link} />
            ) : (
              <>
                {internal ? (
                  <Link
                    className="page__link"
                    href={link.href}
                    aria-label={link.label ?? link.name}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    className="page__link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label ?? link.name}
                  >
                    {link.name}
                  </a>
                )}{" "}
                <span className="page__meta">— {link.meta}</span>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
