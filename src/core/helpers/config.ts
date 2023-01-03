import { computed } from "vue";
import { useConfigStore } from "../../stores/config.store";

const store = useConfigStore();


/**
 * Returns layout config
 * @returns {object}
 */
 export const config = computed(() => {
  return store.getLayoutConfig();
});

/**
 * Returns theme mode
 * @returns {string}
 */
export const themeMode = computed(() => {
  return store.getLayoutConfig("general.mode");
});

/**
 * Set the sidebar display
 * @returns {boolean}
 */
export const displaySidebar = computed(() => {
  return store.getLayoutConfig("sidebar.display");
});

/**
 * Sidebar toggle
 * @returns {boolean}
 */
export const sidebarToggleDisplay = computed(() => {
  return store.getLayoutConfig("sidebar.default.minimize.desktop.enabled");
});

/**
 * Check if footer container is fluid
 * @returns {boolean}
 */
export const footerWidthFluid = computed(() => {
  return store.getLayoutConfig("footer.container") === "fluid";
});

/**
 * Footer display
 * @returns {boolean}
 */
export const footerDisplay = computed(() => {
  return store.getLayoutConfig("footer.display");
});

/**
 * Check if header container is fluid
 * @returns {boolean}
 */
export const headerWidthFluid = computed(() => {
  return store.getLayoutConfig("header.default.container") === "fluid";
});

/**
 * Header display
 * @returns {boolean}
 */
export const headerDisplay = computed(() => {
  return store.getLayoutConfig("header.display");
});

/**
 * Returns header left part type
 * @returns {string}
 */
export const headerLeft = computed(() => {
  return store.getLayoutConfig("header.left");
});

/**
 * Sidebar display
 * @returns {boolean}
 */
export const sidebarDisplay = computed(() => {
  return store.getLayoutConfig("sidebar.display");
});

/**
 * Layout type
 * @returns {string}
 */
export const layout = computed(() => {
  return store.getLayoutConfig("general.layout");
});

/**
 * Check if toolbar width is fluid
 * @returns {boolean}
 */
export const toolbarWidthFluid = computed(() => {
  return store.getLayoutConfig("toolbar.container") === "fluid";
});

/**
 * Set the toolbar display
 * @returns {boolean}
 */
export const toolbarDisplay = computed(() => {
  return store.getLayoutConfig("toolbar.display");
});

/**
 * Check if container width is fluid
 * @returns {boolean}
 */
export const contentWidthFluid = computed(() => {
  return store.getLayoutConfig("content.container") === "fluid";
});

/**
 * Check if the sidebar menu is enabled
 * @returns {boolean}
 */
export const sidebarEnabled = computed(() => {
  return !!store.getLayoutConfig("aside.display");
});

/**
 * Set the sidebar theme
 * @returns {string}
 */
export const sidebarTheme = computed(() => {
  return store.getLayoutConfig("aside.theme");
});

/**
 * Set the subheader display
 * @returns {boolean}
 */
export const subheaderDisplay = computed(() => {
  return store.getLayoutConfig("toolbar.display");
});

/**
 * Set the sidebar menu icon type
 * @returns {string}
 */
export const sidebarMenuIcons = computed(() => {
  return store.getLayoutConfig("sidebar.default.menu.iconType");
});

/**
 * Light theme logo image
 * @returns {string}
 */
export const themeLightLogo = computed(() => {
  return store.getLayoutConfig("main.logo.light");
});

/**
 * Dark theme logo image
 * @returns {string}
 */
export const themeDarkLogo = computed(() => {
  return store.getLayoutConfig("main.logo.dark");
});

/**
 * Set the header menu icon type
 * @returns {string}
 */
export const headerMenuIcons = computed(() => {
  return store.getLayoutConfig("header.default.menu.iconType");
});

/**
 * Set the header menu display
 * @returns {string}
 */
export const headerMenuDisplay = computed(() => {
  return store.getLayoutConfig("header.default.menu.display");
});

/**
 * Page title display
 * @returns {boolean}
 */
export const pageTitleDisplay = computed(() => {
  return store.getLayoutConfig("pageTitle.display");
});

/**
 * Page title breadcrumb display
 * @returns {boolean}
 */
export const pageTitleBreadcrumbDisplay = computed(() => {
  return store.getLayoutConfig("pageTitle.breadcrumb");
});

/**
 * Page title direction display
 * @returns { "row" | "column" }
 */
export const pageTitleDirection = computed(() => {
  return store.getLayoutConfig("pageTitle.direction");
});

/**
 * Scrolltop display
 * @returns {boolean}
 */
export const scrolltopDispaly = computed(() => {
  return store.getLayoutConfig("scrolltop.display");
});

/**
 * Illustrations set
 * @returns {string}
 */
export const illustrationsSet = computed(() => {
  return store.getLayoutConfig("illustrations.set");
});
