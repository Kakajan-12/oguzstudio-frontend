"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { FilterOption } from "@/features/portfolio/model/types";
import { sendContactRequest, SubmitFailed, type SubmitError } from "@/shared/api/forms";
import { ArrowButton } from "@/shared/ui";
import { CategorySelect } from "./CategorySelect";
import { FormField, FormTextarea } from "./FormField";
import { RECAPTCHA_SITE_KEY, ReCaptcha } from "./ReCaptcha";

type ContactFormProps = {
  /** Services from the admin; "Other" is added here */
  categories: FilterOption[];
  className?: string;
};

export function ContactForm({ categories, className }: ContactFormProps) {
  const t = useTranslations("ContactsPage.form");
  const locale = useLocale();
  const [category, setCategory] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  // Bumped after sending to remount the captcha, since a token can be used only once
  const [captchaKey, setCaptchaKey] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<SubmitError | null>(null);

  const options = [...categories, { value: "other", label: t("categories.other") }];
  const isCaptchaMissing = Boolean(RECAPTCHA_SITE_KEY) && !captchaToken;

  const resetCaptcha = () => {
    setCaptchaToken(null);
    setCaptchaKey((key) => key + 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const field = (name: string) => String(new FormData(form).get(name) ?? "").trim();

    setStatus("sending");
    setError(null);
    try {
      await sendContactRequest({
        firstName: field("firstName"),
        lastName: field("lastName"),
        email: field("email"),
        phone: field("phone"),
        company: field("company"),
        category: category ?? "",
        description: field("description"),
        locale,
        recaptchaToken: captchaToken ?? undefined,
      });
      form.reset();
      setCategory(null);
      setStatus("sent");
    } catch (e) {
      setError(e instanceof SubmitFailed ? e.reason : "network");
      setStatus("idle");
    } finally {
      resetCaptcha();
    }
  };

  const clearStatus = () => {
    if (status === "sent") setStatus("idle");
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} onChange={clearStatus} className={className}>
      <div className="grid gap-y-5 lg:grid-cols-2 lg:gap-x-[76px]">
        <FormField
          label={t("firstName")}
          name="firstName"
          autoComplete="given-name"
          maxLength={100}
          required
        />
        <FormField
          label={t("lastName")}
          name="lastName"
          autoComplete="family-name"
          maxLength={100}
        />
        <FormField
          label={t("email")}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={200}
          required
        />
        <FormField
          label={t("phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={50}
        />
        <FormField
          label={t("company")}
          name="company"
          autoComplete="organization"
          maxLength={200}
        />
        <CategorySelect
          name="category"
          label={t("category")}
          options={options}
          value={category}
          onChange={(value) => {
            setCategory(value);
            clearStatus();
          }}
        />
        <FormTextarea
          label={t("description")}
          name="description"
          maxLength={5000}
          className="lg:col-span-2"
        />
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <ReCaptcha key={captchaKey} onChange={setCaptchaToken} />
        <div className="flex flex-col gap-4 lg:ml-auto lg:items-end">
          {status === "sent" && (
            <p role="status" className="text-sm leading-[1.4] text-muted">
              {t("sent")}
            </p>
          )}
          {error && (
            <p role="alert" className="text-sm leading-[1.4] text-red-600">
              {t(`errors.${error}`)}
            </p>
          )}
          <ArrowButton
            type="submit"
            disabled={isCaptchaMissing || status === "sending"}
            className="max-lg:w-full"
          >
            {status === "sending" ? t("sending") : t("send")}
          </ArrowButton>
        </div>
      </div>
    </form>
  );
}
