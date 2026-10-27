import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

type LinkButtonProps = {
  href: string;
  variant?: "primary" | "outline";
  className?: string;
  children: React.ReactNode;
};

/** 48px button-styled link with an up-right arrow, meant for dark backgrounds */
export function LinkButton({
  href,
  variant = "primary",
  className,
  children,
}: LinkButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-12 w-full items-center gap-2.5 rounded-xs py-2.5 pr-5 pl-6 text-base transition-colors lg:w-auto",
        isPrimary
          ? "bg-white text-dark hover:bg-line"
          : "border border-line text-white hover:bg-white/10",
        className,
      )}
    >
      <span className="flex-1 text-center whitespace-nowrap lg:flex-none">
        {children}
      </span>
      <Image
        src={
          isPrimary
            ? "/icons/arrow-up-right-dark.svg"
            : "/icons/arrow-up-right-white.svg"
        }
        alt=""
        width={12}
        height={12}
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:size-3"
      />
    </Link>
  );
}
