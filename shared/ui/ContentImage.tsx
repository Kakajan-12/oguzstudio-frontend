import Image, { type ImageProps } from "next/image";

/**
 * next/image for images that come from the API: SVGs (e.g. brand logos) are served as-is,
 * since the optimizer doesn't process them.
 */
export function ContentImage({ alt, unoptimized, ...props }: ImageProps) {
  const isSvg = typeof props.src === "string" && /\.svg($|\?)/i.test(props.src);
  return <Image alt={alt} unoptimized={unoptimized || isSvg} {...props} />;
}
