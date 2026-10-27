"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

type Grecaptcha = {
  ready: (callback: () => void) => void;
  render: (
    container: HTMLElement,
    params: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
    },
  ) => number;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const SCRIPT_ID = "recaptcha-script";

function loadScript(locale: string, onLoad: () => void) {
  if (window.grecaptcha) return onLoad();

  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=${locale}`;
    script.async = true;
    document.head.appendChild(script);
  }
  script.addEventListener("load", onLoad, { once: true });
}

type ReCaptchaProps = {
  /** Receives the token once solved and `null` when it expires */
  onChange: (token: string | null) => void;
  className?: string;
};

/** Google reCAPTCHA v2 checkbox; renders nothing while NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set */
export function ReCaptcha({ onChange, className }: ReCaptchaProps) {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!RECAPTCHA_SITE_KEY || !container) return;

    loadScript(locale, () => {
      window.grecaptcha?.ready(() => {
        // The widget can only be rendered once per element
        if (container.childElementCount > 0) return;
        window.grecaptcha?.render(container, {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: (token) => onChangeRef.current(token),
          "expired-callback": () => onChangeRef.current(null),
        });
      });
    });
  }, [locale]);

  if (!RECAPTCHA_SITE_KEY) return null;

  return <div ref={containerRef} className={className} />;
}
