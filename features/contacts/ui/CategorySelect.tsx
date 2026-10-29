"use client";

import { useState } from "react";
import Image from "next/image";
import { Dropdown, type MenuProps } from "antd";
import { cn } from "@/shared/lib/cn";
import type { FilterOption } from "@/features/portfolio/model/types";
import { fieldControlClassName, floatingLabelClassName } from "./FormField";

type CategorySelectProps = {
  name: string;
  label: string;
  options: FilterOption[];
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
};

/** Underlined dropdown styled like the other form fields; the choice is submitted via a hidden input */
export function CategorySelect({
  name,
  label,
  options,
  value,
  onChange,
  className,
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const items: MenuProps["items"] = options.map((option) => ({
    key: option.value,
    label: option.label,
  }));
  const selected = options.find((option) => option.value === value);

  return (
    <div className={cn("relative pt-5", className)}>
      <input type="hidden" name={name} value={value ?? ""} />
      <Dropdown
        trigger={["click"]}
        placement="bottomLeft"
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        // Rendered next to the trigger so the menu can take the field's full width
        getPopupContainer={(node) => node.parentElement ?? document.body}
        styles={{ root: { width: "100%" } }}
        menu={{
          items,
          selectable: true,
          selectedKeys: value ? [value] : [],
          onClick: ({ key }) => {
            onChange(key);
            setIsOpen(false);
          },
        }}
      >
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={selected ? `${label}: ${selected.label}` : label}
          className={cn(
            fieldControlClassName,
            "flex h-11 cursor-pointer items-center justify-between gap-3 text-left",
            isOpen && "border-dark",
          )}
        >
          <span className="truncate">{selected ? selected.label : label}</span>
          <span className="flex h-[11.3px] w-4 shrink-0 items-center justify-center">
            <Image
              src="/icons/chevron-small.svg"
              alt=""
              width={9}
              height={12}
              className={cn(
                "h-4 w-[11.3px] max-w-none transition-transform duration-300",
                isOpen ? "-rotate-90" : "rotate-90",
              )}
            />
          </span>
        </button>
      </Dropdown>
      {selected && <span className={floatingLabelClassName}>{label}</span>}
    </div>
  );
}
