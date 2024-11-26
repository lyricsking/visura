import { ComponentProps, FC, useState } from "react";
import { ComponentInfo } from "~/core/block";

export type ImageProps = {
  /** The source URL of the image */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Optional CSS classes to style the text component */
  class?: string;
  /** Optional Placeholder image or fallback content to display if the image fails to load */
  fallbackSrc?: string;
  /**
   * Lazy load image to improve performance.
   * Defaults to `true`
   */
  lazy?: string;
  /** Additional props for the underlying <img> element */
  [key: string]: any;
};
/**
 * A flexible and production-ready Image component with lazy loading and fallback support
 */
export const Image: FC<ImageProps> = ({
  src,
  alt,
  class: className = "",
  fallbackSrc,
  lazy = true,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isError, setIsError] = useState<boolean>(false);

  const handleError = () => {
    if (fallbackSrc) {
      setImageSrc(fallbackSrc);
    }

    setIsError(true);
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`object-cover ${className}`}
      loading={lazy ? "lazy" : "eager"}
      onError={handleError}
      {...props}
    />
  );
};

export const ImageValueType: ComponentInfo = {
  component: Image,
  description: "",
  instructions: "",
  props: {},
  usageExample: `type: img
  src: ""
  alt: ""
  fallbackSrc: ""
  lazy: true
  width: 300
  height: 300
  class: "rounded`,
};

export default Image;
