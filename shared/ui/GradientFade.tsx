import { cn } from "@/shared/lib/cn";

const STOPS =
  "rgb(15,15,15) 3.59%, rgb(26,26,26) 13.24%, rgb(42,42,42) 22.88%, rgb(58,58,58) 32.52%, rgb(75,75,75) 42.16%, rgb(96,96,96) 51.8%, rgb(123,123,123) 61.44%, rgb(156,155,155) 71.08%, rgb(190,190,190) 80.72%, rgb(230,230,230) 90.36%, rgb(255,255,255) 100%";

type GradientFadeProps = {
  /** `toLight` fades from the dark brand color into white, `toDark` the other way round */
  direction: "toLight" | "toDark";
  className?: string;
};

export function GradientFade({ direction, className }: GradientFadeProps) {
  return (
    <div
      aria-hidden
      className={cn("h-35 w-full lg:h-75", className)}
      style={{
        backgroundImage: `linear-gradient(${direction === "toLight" ? "180deg" : "0deg"}, ${STOPS})`,
      }}
    />
  );
}
