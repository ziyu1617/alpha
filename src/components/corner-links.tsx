"use client";

import { useRef, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LinkItem } from "@/data/links";

/* 右下角的小角标：外链新窗口打开；带 copy 字段的项点击复制并短暂显示反馈 */

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

function CopyMark({ link }: { link: LinkItem }) {
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="page__mark"
            aria-label={link.label ?? link.name}
            aria-live="polite"
            onClick={handleClick}
          >
            {copied ? <span className="page__ok">✓ 已复制 · copied</span> : link.name}
          </button>
        </TooltipTrigger>
        <TooltipContent>点击复制 · click to copy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function CornerLinks({ links }: { links: LinkItem[] }) {
  return (
    <span className="page__corner">
      {links.map((link) =>
        link.copy ? (
          <CopyMark key={link.name} link={link} />
        ) : (
          <a
            key={link.name}
            className="page__mark"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label ?? link.name}
          >
            {link.name} ↗
          </a>
        ),
      )}
    </span>
  );
}
