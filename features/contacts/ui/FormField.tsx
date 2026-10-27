import { cn } from "@/shared/lib/cn";

export const fieldControlClassName =
  "w-full border-b border-stroke bg-transparent px-2.5 text-base font-medium text-black outline-none transition-colors hover:border-dark focus:border-dark";

/** Small caption the placeholder turns into once the field is focused or filled */
export const floatingLabelClassName =
  "pointer-events-none absolute top-0 left-0 text-xs leading-none text-muted";

// Controls get a single-space placeholder so `:placeholder-shown` tells an empty field apart
const placeholderLabelClassName =
  "transition-all duration-200 peer-placeholder-shown:left-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-black peer-focus:left-0 peer-focus:top-0 peer-focus:text-xs peer-focus:font-normal peer-focus:text-muted";

type FieldLabelProps = {
  label: string;
  /** Label offset while it stands in for the placeholder */
  placeholderTopClassName: string;
  className?: string;
  children: React.ReactNode;
};

function FieldLabel({
  label,
  placeholderTopClassName,
  className,
  children,
}: FieldLabelProps) {
  return (
    <label className={cn("relative block pt-5", className)}>
      {children}
      <span
        className={cn(
          floatingLabelClassName,
          placeholderLabelClassName,
          placeholderTopClassName,
        )}
      >
        {label}
      </span>
    </label>
  );
}

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

/** Underlined input with a floating label */
export function FormField({ label, className, ...props }: FormFieldProps) {
  return (
    <FieldLabel
      label={label}
      placeholderTopClassName="peer-placeholder-shown:top-[34px]"
      className={className}
    >
      <input
        {...props}
        placeholder=" "
        className={cn(fieldControlClassName, "peer h-11")}
      />
    </FieldLabel>
  );
}

type FormTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

/** Underlined resizable textarea with a floating label */
export function FormTextarea({ label, className, ...props }: FormTextareaProps) {
  return (
    <FieldLabel
      label={label}
      placeholderTopClassName="peer-placeholder-shown:top-9"
      className={className}
    >
      <textarea
        {...props}
        placeholder=" "
        className={cn(
          fieldControlClassName,
          "peer block h-[130px] min-h-20 resize-y pt-3 pb-2 leading-normal",
        )}
      />
    </FieldLabel>
  );
}
