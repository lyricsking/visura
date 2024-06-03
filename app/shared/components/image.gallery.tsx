import { ComponentProps } from "react";

type MansoryItem = {
  id: string,
  attrs: ComponentProps<"img">
}

type MansoryProps = {
  items: MansoryItem[];
}

export function Mansory({ items }: MansoryProps) {
  const firstColumn = items.filter((_, index) => index % 4 === 0);
  const secondColumn = items.filter((_, index) => index % 4 === 1);
  const thirdColumn = items.filter((_, index) => index % 4 === 2);
  const fourthColumn = items.filter((_, index) => index % 4 === 3);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20">
      <div className="grid gap-4">
        {firstColumn.map((item) => (
          <img key={item.id} {...item.attrs} />
        ))}
      </div>
      <div className="grid gap-4">
        {secondColumn.map((item) => (
          <img key={item.id} {...item.attrs} />
        ))}
      </div>
      <div className="grid gap-4">
        {thirdColumn.map((item) => (
          <img key={item.id} {...item.attrs} />
        ))}
      </div>
      <div className="grid gap-4">
        {fourthColumn.map((item) => (
          <img key={item.id} {...item.attrs} />
        ))}
      </div>
    </div>
  );
}
