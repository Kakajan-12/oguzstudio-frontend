import Image from "next/image";
import { cn } from "@/shared/lib/cn";

export type SectionTheme = "light" | "dark";

type SectionLabelProps = {
  theme?: SectionTheme;
  children: React.ReactNode;
};

export function SectionLabel({ theme = "light", children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={theme === "dark" ? "/icons/slash-light.svg" : "/icons/slash-gray.svg"}
        alt=""
        width={10}
        height={29}
        className="h-[18px] w-[7px] lg:h-[29px] lg:w-[10px]"
      />
      <span
        className={cn(
          "text-[13px] leading-[1.4] font-medium uppercase lg:text-lg lg:leading-normal lg:tracking-[0.36px]",
          theme === "dark" ? "text-soft" : "text-muted",
        )}
      >
        {children}
      </span>
    </div>
  );
}
