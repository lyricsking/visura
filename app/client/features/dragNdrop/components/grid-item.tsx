import { memo } from "react";

interface GridItemProps {
  id: string;
  content: string;
}

const GridItem = ({ id, content }: GridItemProps) => {
  return (
    <div
      style={{
        background: "#f5f5f5",
        border: "1px solid #ddd",
        display: "flex",
        justifyContent: "center",

        alignItems: "center",
        fontSize: "14px",
      }}
    >
      {content}
    </div>
  );
};

export default memo(GridItem); //Avoids unnecessary re-render
