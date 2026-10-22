"use client";

import { Check, Link2 } from "lucide-react";
import { useEffect, useState } from "react";

/** Copies the page URL so visitors can pass Cinewex along. */
export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-10 items-center gap-2 rounded-control border border-line-strong px-4 text-sm text-fg transition-colors hover:border-fg"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4 text-gold" />
      ) : (
        <Link2 aria-hidden="true" className="size-4" />
      )}
      <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
    </button>
  );
}
