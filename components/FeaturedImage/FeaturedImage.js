import Image from "next/image"
export default function FeaturedImage({
  image,
  width,
  height,
  className,
  priority,
  fill,
  ...props
}) {
  const src = image?.sourceUrl;
  const { altText } = image || '';

  width = width ? width : image?.mediaDetails?.width;
  height = height ? height : image?.mediaDetails?.height;

  return src && width && height ? (
    <figure className={className}>
      <Image
        src={src}
        alt={altText}
        fill={fill}
        width={width}
        height={height}
        priority={priority}
        {...props}
        />
    </figure>
  ) : null;
}
