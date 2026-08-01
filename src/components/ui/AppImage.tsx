import type { ImgHTMLAttributes } from "react";

export type StaticImageData = { src: string };

type AppImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | StaticImageData;
  fill?: boolean;
  priority?: boolean;
};

export default function AppImage({ src, fill, priority, style, ...props }: AppImageProps) {
  const imageSrc = typeof src === "string" ? src : src.src;

  return (
    <img
      src={imageSrc}
      loading={priority ? "eager" : "lazy"}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style}
      {...props}
    />
  );
}
