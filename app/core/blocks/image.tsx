import Button from "~/components/button";
import { BlockProps } from ".";

interface ImageBlockProps extends BlockProps {
  src: string;
  alt: string;
  className: string;
}

export function ImageBlock({ src, alt }: ImageBlockProps) {
  return (
    <div className="p-4 bg-gray-200 my-2 rounded">
      {src && alt ? (
        <img src={src} alt={alt} className="" />
      ) : (
        <Button className="bg-blue-500">Upload image</Button>
      )}
    </div>
  );
}
