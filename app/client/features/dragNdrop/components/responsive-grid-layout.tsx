import { memo, useMemo } from "react";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import GridItem from "./grid-item";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface ResponsiveGridProps {
  layouts: ReactGridLayout.Layouts;
  onLayoutChange: (layouts: ReactGridLayout.Layouts) => void;
}

const ResponsiveGrid = ({ layouts, onLayoutChange }: ResponsiveGridProps) => {
  // Memoize grid items for responsiveness
  const gridItems = useMemo(
    () =>
      layouts.lg.map((item) => (
        <GridItem key={item.i} id={item.i} content={`Box ${item.i}`} />
      )),
    [layouts.lg]
  );

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xss: 0 }}
      cols={{ lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 }}
      rowHeight={30}
      onLayoutChange={(currentLayout, allLayouts) => onLayoutChange(allLayouts)}
      isDraggable
      isResizable
    >
      {gridItems}
    </ResponsiveGridLayout>
  );
};
export default memo(ResponsiveGrid); // Optimize re-renders
