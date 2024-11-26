import { ComponentProps, FC } from "react";

type ImageBlockProps = ComponentProps<"img"> & {};

export const ImageBlock: FC<ImageBlockProps> = ({ src, alt }) => {
  return (
    <div className="p-4 bg-gray-200 my-2 rounded">
      {src && alt ? (
        <img src={src} alt={alt} className="" />
      ) : (
        <div className="bg-blue-500">Upload image</div>
      )}
    </div>
  );
};
