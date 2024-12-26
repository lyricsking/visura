// Helper function to dynamically load Lucide icons
const getLucideIcon = (name) => {
  const icons = {
    home: Home,
    settings: Settings,
    // Add more icons here...
  };
  return icons[name] || null;
};
