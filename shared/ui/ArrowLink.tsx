import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import type { SectionTheme } from "./SectionLabel";

const DEFAULT_WIDTH = "w-[228px] lg:w-[288px]";

function getArrowClassName(
  isDark: boolean,
  className?: string,
  widthClassName = DEFAULT_WIDTH,
) {
  return cn(
    "group flex flex-col gap-3 lg:gap-2.5",
    widthClassName,
    isDark ? "text-white" : "text-black",
    className,
  );
}

function ArrowContent({
  isDark,
  children,
}: {
  isDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <span className="flex items-end justify-between gap-4">
        <span className="text-base leading-none font-semibold tracking-[0.32px] lg:text-lg lg:font-[450] lg:tracking-[0.36px]">
          {children}
        </span>
        <Image
          src={
            isDark
              ? "/icons/arrow-up-right-white.svg"
              : "/icons/arrow-up-right-black.svg"
          }
          alt=""
          width={14}
          height={14}
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:size-3.5"
        />
      </span>
      <span
        className={cn(
          "h-0.5 w-full origin-left transition-transform duration-300 group-hover:scale-x-105 lg:h-px",
          isDark ? "bg-white" : "bg-black",
        )}
      />
    </>
  );
}

type ArrowLinkProps = {
  href: string;
  theme?: SectionTheme;
  className?: string;
  /** Replaces the default width classes, e.g. "w-[187px]" */
  widthClassName?: string;
  children: React.ReactNode;
};

/** Underlined text link with an up-right arrow ("Read more", "Start a Consultation") */
export function ArrowLink({
  href,
  theme = "light",
  className,
  widthClassName,
  children,
}: ArrowLinkProps) {
  const isDark = theme === "dark";

  return (
    <Link
      href={href}
      className={getArrowClassName(isDark, className, widthClassName)}
    >
      <ArrowContent isDark={isDark}>{children}</ArrowContent>
    </Link>
  );
}

type ArrowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: SectionTheme;
  widthClassName?: string;
};

/** The same underlined arrow control rendered as a button, e.g. a form submit */
export function ArrowButton({
  theme = "light",
  type = "button",
  className,
  widthClassName,
  children,
  ...props
}: ArrowButtonProps) {
  const isDark = theme === "dark";

  return (
    <button
      type={type}
      className={getArrowClassName(
        isDark,
        cn("cursor-pointer disabled:cursor-not-allowed disabled:opacity-40", className),
        widthClassName,
      )}
      {...props}
    >
      <ArrowContent isDark={isDark}>{children}</ArrowContent>
    </button>
  );
}
