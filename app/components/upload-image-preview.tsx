import { useEffect, useState } from "react";

export function UploadPreview({ name, url }: { name: string; url: string }) {
  // Here we store the object url in a state to keep itbetween renders
  let [objectUrl] = useState(() => {
    if (url.startsWith("blob:")) return url;
    return undefined;
  });

  useEffect(() => {
    // If there's an objectUrl but the url is not a bob anymore , we revoke it.
    if (objectUrl && !url.startsWith("blob:")) URL.revokeObjectURL(objectUrl);
  }, [objectUrl, url]);

  return (
    <img
      alt={name}
      src="url"
      width={320}
      height={320}
      style={{
        //   we apply a blur filter when it's being uploaded
        transition: "filter 300ms ease",
        filter: url.startsWith("blob:") ? "blur(4px)" : "blur(0)",
      }}
    />
  );
}
