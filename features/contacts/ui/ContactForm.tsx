"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowButton } from "@/shared/ui";
import type { ProjectCategory } from "../model/categories";
import { CategorySelect } from "./CategorySelect";
import { FormField, FormTextarea } from "./FormField";
import { RECAPTCHA_SITE_KEY, ReCaptcha } from "./ReCaptcha";

export function ContactForm({ className }: { className?: string }) {
  const t = useTranslations("ContactsPage.form");
  const [category, setCategory] = useState<ProjectCategory | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  // Bumped after sending to remount the captcha, since a token can be used only once
  const [captchaKey, setCaptchaKey] = useState(0);
  const [isSent, setIsSent] = useState(false);

  const isCaptchaMissing = Boolean(RECAPTCHA_SITE_KEY) && !captchaToken;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: send the form data and captchaToken to the API once the endpoint is ready
    event.currentTarget.reset();
    setCategory(null);
    setCaptchaToken(null);
    setCaptchaKey((key) => key + 1);
    setIsSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setIsSent(false)}
      className={className}
    >
      <div className="grid gap-y-5 lg:grid-cols-2 lg:gap-x-[76px]">
        <FormField
          label={t("firstName")}
          name="firstName"
          autoComplete="given-name"
          required
        />
        <FormField
          label={t("lastName")}
          name="lastName"
          autoComplete="family-name"
        />
        <FormField
          label={t("email")}
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <FormField
          label={t("phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
        />
        <FormField
          label={t("company")}
          name="company"
          autoComplete="organization"
        />
        <CategorySelect
          name="category"
          label={t("category")}
          value={category}
          onChange={(value) => {
            setCategory(value);
            setIsSent(false);
          }}
        />
        <FormTextarea
          label={t("description")}
          name="description"
          className="lg:col-span-2"
        />
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <ReCaptcha key={captchaKey} onChange={setCaptchaToken} />
        <div className="flex flex-col gap-4 lg:ml-auto lg:items-end">
          {isSent && (
            <p role="status" className="text-sm leading-[1.4] text-muted">
              {t("sent")}
            </p>
          )}
          <ArrowButton
            type="submit"
            disabled={isCaptchaMissing}
            className="max-lg:w-full"
          >
            {t("send")}
          </ArrowButton>
        </div>
      </div>
    </form>
  );
}
