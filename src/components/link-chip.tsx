"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties, type MouseEvent } from "react";

import { Sprite, isWideSprite } from "@/components/sprite";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LinkItem } from "@/data/links";
import { cn } from "@/lib/utils";

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

export function LinkChip({ link, index }: { link: LinkItem; index: number }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const num = String(index + 1).padStart(2, "0");
  const external = /^https?:\/\//.test(link.href);
  const internal = link.href.startsWith("/");

  function handleCopy(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    void copyText(link.copy!).then(() => {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(
        () => setCopied(false),
        COPIED_FEEDBACK_MS,
      );
    });
  }

  const chipProps = {
    className: cn("chip", copied && "is-copied"),
    style: {
      "--accent": `var(--${link.accent})`,
      "--rot": `${link.rot}deg`,
    } as CSSProperties,
    "aria-label": link.label ?? link.name,
    ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
    ...(link.copy ? { onClick: handleCopy } : {}),
  };

  const body = (
    <>
      <span className="chip__head">
        <span
          className={cn("chip__icon", isWideSprite(link.icon) && "chip__icon--lg")}
        >
          <Sprite id={link.icon} />
        </span>
        <span className="chip__go">↗</span>
      </span>
      <span className="chip__name">{link.name}</span>
      <span className="chip__meta" aria-live={link.copy ? "polite" : undefined}>
        {copied ? (
          <>
            <span className="chip__num">✓</span> 已复制 · copied
          </>
        ) : (
          <>
            <span className="chip__num">{num}</span> · {link.meta}
          </>
        )}
      </span>
      <span className="chip__spark">
        <Sprite id={link.spark} />
      </span>
    </>
  );

  const anchor = internal ? (
    <Link href={link.href} {...chipProps}>
      {body}
    </Link>
  ) : (
    <a href={link.href} {...chipProps}>
      {body}
    </a>
  );

  if (!link.copy) return anchor;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{anchor}</TooltipTrigger>
        <TooltipContent>点击复制 · click to copy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
