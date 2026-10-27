"use client";

import { useState } from "react";
import Image from "next/image";
import { Dropdown, type MenuProps } from "antd";
import { cn } from "@/shared/lib/cn";
import type { FilterOption } from "../model/types";

const controlClassName =
  "flex h-10 min-w-0 cursor-pointer items-center justify-between rounded-[2px] border border-stroke px-4 text-sm leading-none font-medium tracking-[0.28px] text-black transition-colors hover:border-dark";

type PortfolioFilterProps = {
  label: string;
  options: FilterOption[];
  onSelect: (option: FilterOption) => void;
  className?: string;
};

/** Outlined 40px dropdown listing the options of one filter */
export function PortfolioFilter({
  label,
  options,
  onSelect,
  className,
}: PortfolioFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const items: MenuProps["items"] = options.map((option) => ({
    key: option.value,
    label: option.label,
  }));

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomLeft"
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      menu={{
        items,
        onClick: ({ key }) => {
          const option = options.find(({ value }) => value === key);
          if (option) onSelect(option);
        },
      }}
    >
      <button type="button" className={cn(controlClassName, "gap-2", className)}>
        <span className="truncate">{label}</span>
        <span className="flex h-[8.5px] w-3 shrink-0 items-center justify-center">
          <Image
            src="/icons/chevron-small.svg"
            alt=""
            width={9}
            height={12}
            className={cn(
              "h-3 w-[8.48px] max-w-none transition-transform duration-300",
              isOpen ? "-rotate-90" : "rotate-90",
            )}
          />
        </span>
      </button>
    </Dropdown>
  );
}

type PortfolioFilterChipProps = {
  label: string;
  clearLabel: string;
  onClear: () => void;
};

/** The applied filter value with a cross that resets it */
export function PortfolioFilterChip({
  label,
  clearLabel,
  onClear,
}: PortfolioFilterChipProps) {
  return (
    <button
      type="button"
      aria-label={`${clearLabel}: ${label}`}
      onClick={onClear}
      className={cn(controlClassName, "max-w-full gap-3 self-start")}
    >
      <span className="truncate">{label}</span>
      <span aria-hidden className="relative size-2.5 shrink-0">
        <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
        <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
      </span>
    </button>
  );
}
