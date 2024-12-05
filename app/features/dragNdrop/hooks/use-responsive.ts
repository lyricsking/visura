import { useCallback, useState } from "react";
import { Layouts } from "react-grid-layout";

const useResponsiveGrid = () => {
  const [layouts, setLayouts] = useState<Layouts>({
    lg: [
      { i: "1", x: 0, y: 0, w: 2, h: 2 },
      { i: "2", x: 2, y: 0, w: 4, h: 2 },
    ],
  });

  const addItem = useCallback(() => {
    const newItem = {
      i: `${layouts.lg.length + 1}`,
      x: (layouts.lg.length * 2) % 12,
      y: Infinity, // Place at the bottom
      w: 2,
      h: 2,
    };

    setLayouts((prev) => ({
      ...prev,
      lg: [],
    }));
  }, []);
};
