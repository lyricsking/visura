import blog from "./blog";

/**
 * Calls each feature's loader function.
 * Each loader function registers the plugin in the plugin registry.
 * @returns
 */
export const loadPlugins = async  () => {
  blog();
};
