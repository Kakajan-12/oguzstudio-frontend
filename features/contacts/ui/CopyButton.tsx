"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/cn";

const COPIED_TIMEOUT = 2000;

/** Copies the value to the clipboard and briefly shows "Copied" */
export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const t = useTranslations("ContactsPage.info");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timeout = setTimeout(() => setIsCopied(false), COPIED_TIMEOUT);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
    } catch {
      // Clipboard access can be denied; the value is still visible to copy by hand
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={cn("cursor-pointer", className)}
    >
      {isCopied ? t("copied") : t("copy")}
    </button>
  );
}
