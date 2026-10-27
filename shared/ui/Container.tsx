import { cn } from "@/shared/lib/cn";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-308 2xl:max-w-324 3xl:max-w-400 4xl:max-w-420 px-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
