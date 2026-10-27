import { useTranslations } from "next-intl";
import { CONTACTS } from "@/shared/config/contacts";
import { cn } from "@/shared/lib/cn";
import { CopyButton } from "./CopyButton";

const actionClassName =
  "text-sm leading-none text-stroke transition-colors hover:text-dark lg:text-lg lg:leading-normal";

const valueLinkClassName = "transition-opacity hover:opacity-70";

type InfoRowProps = {
  label: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Mobile: label and action on the first line, value below.
 * Desktop: label, value and action in three columns.
 */
function InfoRow({ label, action, children }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 border-b border-line py-5 lg:min-h-24 lg:grid-cols-[404px_minmax(0,1fr)_187px] lg:gap-0 lg:py-6">
      <dt className="col-start-1 row-start-1 text-sm leading-none text-muted lg:text-lg lg:leading-normal lg:text-black">
        {label}
      </dt>
      <dd className="col-span-2 col-start-1 row-start-2 font-orbitron text-base leading-[1.3] font-medium text-black lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:text-xl">
        {children}
      </dd>
      {action && (
        <dd className="col-start-2 row-start-1 lg:col-start-3">{action}</dd>
      )}
    </div>
  );
}

export function ContactsInfo({ className }: { className?: string }) {
  const t = useTranslations("ContactsPage.info");
  const tFooter = useTranslations("Footer");

  return (
    <dl className={cn("border-t border-line", className)}>
      <InfoRow
        label={t("phone")}
        action={<CopyButton value={CONTACTS.phone} className={actionClassName} />}
      >
        <a href={CONTACTS.phoneHref} className={valueLinkClassName}>
          {CONTACTS.phone}
        </a>
      </InfoRow>
      <InfoRow
        label={t("email")}
        action={<CopyButton value={CONTACTS.email} className={actionClassName} />}
      >
        <a href={`mailto:${CONTACTS.email}`} className={valueLinkClassName}>
          {CONTACTS.email}
        </a>
      </InfoRow>
      <InfoRow
        label={t("address")}
        action={
          <a
            href={CONTACTS.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className={actionClassName}
          >
            {t("viewOnMap")}
          </a>
        }
      >
        <address className="not-italic lg:max-w-[320px]">
          {tFooter("addressValue")}
        </address>
      </InfoRow>
      <InfoRow label={t("social")}>
        <span className="flex flex-wrap gap-x-7 gap-y-2">
          <a
            href={CONTACTS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("underline underline-offset-4", valueLinkClassName)}
          >
            Instagram
          </a>
          <a
            href={CONTACTS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("underline underline-offset-4", valueLinkClassName)}
          >
            TikTok
          </a>
        </span>
      </InfoRow>
    </dl>
  );
}
