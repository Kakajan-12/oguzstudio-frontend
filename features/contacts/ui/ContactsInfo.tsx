import { useTranslations } from "next-intl";
import type { CompanyContacts } from "@/shared/api/types";
import { SOCIAL_NETWORKS } from "@/shared/config/socials";
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

type ContactsInfoProps = {
  contacts: CompanyContacts;
  className?: string;
};

export function ContactsInfo({ contacts, className }: ContactsInfoProps) {
  const t = useTranslations("ContactsPage.info");

  return (
    <dl className={cn("border-t border-line", className)}>
      {contacts.phones.map(({ value, href }) => (
        <InfoRow
          key={href}
          label={t("phone")}
          action={<CopyButton value={value} className={actionClassName} />}
        >
          <a href={href} className={valueLinkClassName}>
            {value}
          </a>
        </InfoRow>
      ))}
      {contacts.emails.map((email) => (
        <InfoRow
          key={email}
          label={t("email")}
          action={<CopyButton value={email} className={actionClassName} />}
        >
          <a href={`mailto:${email}`} className={valueLinkClassName}>
            {email}
          </a>
        </InfoRow>
      ))}
      <InfoRow
        label={t("address")}
        action={
          contacts.googleMapsUrl && (
            <a
              href={contacts.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClassName}
            >
              {t("viewOnMap")}
            </a>
          )
        }
      >
        <address className="not-italic lg:max-w-[320px]">
          {contacts.address}
        </address>
      </InfoRow>
      {contacts.socials.length > 0 && (
        <InfoRow label={t("social")}>
          <span className="flex flex-wrap gap-x-7 gap-y-2">
            {contacts.socials.map(({ network, url }, index) => (
              <a
                key={`${network}-${index}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("underline underline-offset-4", valueLinkClassName)}
              >
                {SOCIAL_NETWORKS[network].name}
              </a>
            ))}
          </span>
        </InfoRow>
      )}
    </dl>
  );
}
