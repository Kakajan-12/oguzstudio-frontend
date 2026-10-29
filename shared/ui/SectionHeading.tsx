import { cn } from "@/shared/lib/cn";
import { SectionLabel, type SectionTheme } from "./SectionLabel";

type SectionHeadingProps = {
  label: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  theme?: SectionTheme;
  className?: string;
  titleClassName?: string;
};

/** Section label + Orbitron title, optionally with a description pushed to the right on desktop */
export function SectionHeading({
  label,
  title,
  description,
  theme = "light",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <div className={cn("flex flex-col gap-3 lg:gap-5", className)}>
      <SectionLabel theme={theme}>{label}</SectionLabel>
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <h2
          className={cn(
            "font-orbitron text-3xl font-medium text-balance lg:text-[50px]",
            textColor,
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "max-w-80 text-sm lg:max-w-85 lg:shrink-0 lg:text-justify lg:text-lg",
              textColor,
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
