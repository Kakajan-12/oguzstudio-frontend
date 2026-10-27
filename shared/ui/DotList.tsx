import { Fragment } from "react";
import { cn } from "@/shared/lib/cn";

type DotListProps = {
  items: string[];
  className?: string;
};

/** Inline list of tags separated by 5px dots */
export function DotList({ items, className }: DotListProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-[1.4] tracking-[0.28px] text-muted",
        className,
      )}
    >
      {items.map((item, index) => (
        <Fragment key={item}>
          {index > 0 && (
            <li aria-hidden className="size-[5px] rounded-full bg-dot" />
          )}
          <li>{item}</li>
        </Fragment>
      ))}
    </ul>
  );
}
