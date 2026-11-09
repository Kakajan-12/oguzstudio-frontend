import Image, { type ImageProps } from "next/image";

export function ContentImage({ alt, unoptimized, ...props }: ImageProps) {
  const isSvg = typeof props.src === "string" && /\.svg($|\?)/i.test(props.src);
  return <Image alt={alt} unoptimized={unoptimized || isSvg} {...props} />;
}
