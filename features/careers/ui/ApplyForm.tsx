"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { FormField, FormTextarea, fieldControlClassName, floatingLabelClassName } from "@/features/contacts/ui/FormField";
import { RECAPTCHA_SITE_KEY, ReCaptcha } from "@/features/contacts/ui/ReCaptcha";
import { sendApplication, SubmitFailed } from "@/shared/api/forms";
import { cn } from "@/shared/lib/cn";
import { ArrowButton } from "@/shared/ui";
import type { Position } from "../model/types";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

type FormError = "rateLimit" | "invalid" | "network" | "fileType" | "fileSize" | "fileMissing";

function checkFile(file: File | null): FormError | null {
  if (!file || file.size === 0) return "fileMissing";
  if (!/\.(pdf|docx?)$/i.test(file.name)) return "fileType";
  if (file.size > MAX_SIZE) return "fileSize";
  return null;
}

type ApplyFormProps = {
  position: Position | null;
  onClose: () => void;
};

/** Job application with a resume; the API emails it to the team */
export function ApplyForm({ position, onClose }: ApplyFormProps) {
  const t = useTranslations("CareersPage.applyForm");
  const locale = useLocale();
  const [fileName, setFileName] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<FormError | null>(null);

  const isCaptchaMissing = Boolean(RECAPTCHA_SITE_KEY) && !captchaToken;

  const close = () => {
    onClose();
    // Reset after the closing animation
    setTimeout(() => {
      setStatus("idle");
      setError(null);
      setFileName("");
    }, 300);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!position) return;
    const data = new FormData(event.currentTarget);

    const fileError = checkFile(data.get("resume") as File | null);
    if (fileError) {
      setError(fileError);
      return;
    }

    data.set("position", position.id);
    data.set("locale", locale);
    if (captchaToken) data.set("recaptchaToken", captchaToken);

    setStatus("sending");
    setError(null);
    try {
      await sendApplication(data);
      setStatus("sent");
    } catch (e) {
      setError(e instanceof SubmitFailed ? e.reason : "network");
      setStatus("idle");
    } finally {
      setCaptchaToken(null);
      setCaptchaKey((key) => key + 1);
    }
  };

  return (
    <Modal
      open={position !== null}
      onCancel={close}
      footer={null}
      centered
      width={640}
      destroyOnHidden
      title={
        <span className="font-orbitron text-xl font-semibold lg:text-2xl">
          {position?.title}
        </span>
      }
    >
      {status === "sent" ? (
        <div className="flex flex-col items-start gap-6 py-6">
          <p role="status" className="text-base leading-normal text-black">
            {t("sent")}
          </p>
          <ArrowButton onClick={close}>{t("close")}</ArrowButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} onChange={() => setError(null)} className="pt-4">
          <div className="flex flex-col gap-y-5">
            <FormField label={t("fullName")} name="fullName" autoComplete="name" maxLength={200} required />
            <FormField label={t("email")} name="email" type="email" autoComplete="email" maxLength={200} required />
            <FormField label={t("phone")} name="phone" type="tel" autoComplete="tel" maxLength={50} />
            <FormTextarea label={t("message")} name="message" maxLength={5000} />

            <label className="relative block cursor-pointer pt-5">
              <input
                type="file"
                name="resume"
                accept={ACCEPT}
                // Checked in handleSubmit: the native bubble would point at the visually hidden input
                className="peer sr-only"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
              />
              {fileName && <span className={floatingLabelClassName}>{t("resume")}</span>}
              <span
                className={cn(
                  fieldControlClassName,
                  "flex h-11 items-center justify-between gap-3 peer-focus-visible:border-dark",
                )}
              >
                <span className="truncate">{fileName || t("resume")}</span>
                <Image src="/icons/plus.svg" alt="" width={16} height={16} className="size-4 shrink-0" />
              </span>
              <span className="mt-2 block text-xs leading-[1.4] text-muted">{t("resumeHint")}</span>
            </label>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <ReCaptcha key={captchaKey} onChange={setCaptchaToken} />
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
        </form>
      )}
    </Modal>
  );
}
