import objectPath from "object-path";
import { useBodyStore } from "../../stores/body.store";
import { useConfigStore } from "../../stores/config.store";
import { config } from "../helpers/config";

const bodyStore = useBodyStore();
const configStore = useConfigStore();

class LayoutService {
  /**
   * @description initialize default layout
   */
  public static init(): void {
    //empty body element classes and attributes
    LayoutService.emptyElementClassesAndAttributes(document.body);

    //setup layout
    LayoutService.initLayoutSettings();
    LayoutService.initToolbarSettings();
    LayoutService.initWidthSettings();

    // init layout components
    LayoutService.initDefaultLayout();
    LayoutService.initToolbar();
    LayoutService.initSidebar();
    LayoutService.initSidebarPanel();
    LayoutService.initHeader();
    LayoutService.initFooter();
  }

  // Init Layout settings
  public static initLayoutSettings(): void {
    const pageWidth = objectPath.get(config.value, "general.pageWidth");
    const layout = objectPath.get(config.value, "general.layout");

    bodyStore.addBodyAttribute({
      qualifiedName: "id",
      value: "kt_app_body",
    });

    bodyStore.addBodyClassName("app-" + layout);

    bodyStore.addBodyAttribute({
      qualifiedName: "data-kt-app-layout",
      value: layout,
    });

    if (layout === "light-sidebar") {
      configStore.setLayoutConfigProperty({
        property: "header.default.fixed.desktop",
        value: false,
      });
      configStore.setLayoutConfigProperty({
        property: "header.default.fixed.mobile",
        value: false,
      });
    }

    if (layout === "light-sidebar" || layout === "dark-sidebar") {
      if (pageWidth === "default") {
        configStore.setLayoutConfigProperty({
          property: "header.default.container",
          value: "fluid",
        });
        configStore.setLayoutConfigProperty({
          property: "toolbar.container",
          value: "fluid",
        });
        configStore.setLayoutConfigProperty({
          property: "content.container",
          value: "fluid",
        });
        configStore.setLayoutConfigProperty({
          property: "footer.container",
          value: "fluid",
        });
      }
    }

    if (layout === "light-sidebar" || layout === "dark-sidebar") {
      configStore.setLayoutConfigProperty({
        property: "sidebar.display",
        value: true,
      });
    }

    if (layout === "light-header" || layout === "dark-header") {
      configStore.setLayoutConfigProperty({
        property: "sidebar.display",
        value: false,
      });

      if (pageWidth === "default") {
        configStore.setLayoutConfigProperty({
          property: "header.default.container",
          value: "fixed",
        });

        configStore.setLayoutConfigProperty({
          property: "toolbar.container",
          value: "fixed",
        });

        configStore.setLayoutConfigProperty({
          property: "content.container",
          value: "fixed",
        });

        configStore.setLayoutConfigProperty({
          property: "footer.container",
          value: "fixed",
        });
      }
    }
  }

  // Init toolbar settings
  public static initToolbarSettings(): void {
    const defaultContent = objectPath.get(
      config.value,
      "header.default.content"
    );

    if (defaultContent === "pageTitle") {
      configStore.setLayoutConfigProperty({
        property: "footer.container",
        value: "fixed",
      });
    }
  }

  // Init page width settings
  public static initWidthSettings(): void {
    const pageWidth = objectPath.get(config.value, "general.pageWidth");
    if (pageWidth !== "default") {
      const container = pageWidth === "fluid" ? "fluid" : "fixed";

      // Set page width
      configStore.setLayoutConfigProperty({
        property: "header.default.container",
        value: container,
      });

      configStore.setLayoutConfigProperty({
        property: "toolbar.container",
        value: container,
      });

      configStore.setLayoutConfigProperty({
        property: "content.container",
        value: container,
      });

      configStore.setLayoutConfigProperty({
        property: "footer.container",
        value: container,
      });
    }
  }

  public static initDefaultLayout(): void {
    if (objectPath.get(config.value, "page.class")) {
      bodyStore.addClassName({
        position: "page",
        className: objectPath.get(config.value, "page.class"),
      });
    }

    if (objectPath.get(config.value, "page.container") === "fixed") {
      bodyStore.addClassName({
        position: "page-container",
        className: "container-xxl",
      });
    } else if (objectPath.get(config.value, "page.container") === "fluid") {
      bodyStore.addClassName({
        position: "page-container",
        className: "container-fluid",
      });
    }

    if (objectPath.get(config.value, "page.containerClass")) {
      bodyStore.addClassName({
        position: "page-container",
        className: objectPath.get(config.value, "page.containerClass"),
      });
    }

    if (objectPath.get(config.value, "wrapper.class")) {
      bodyStore.addClassName({
        position: "wrapper",
        className: objectPath.get(config.value, "wrapper.class"),
      });
    }

    if (objectPath.get(config.value, "wrapper.container") === "fixed") {
      bodyStore.addClassName({
        position: "wrapper-container",
        className: "container-xxl",
      });
    } else if (objectPath.get(config.value, "wrapper.container") === "fluid") {
      bodyStore.addClassName({
        position: "wrapper-container",
        className: "container-fluid",
      });
    }

    if (objectPath.get(config.value, "wrapper.containerClass")) {
      bodyStore.addClassName({
        position: "wrapper-container",
        className: objectPath.get(config.value, "wrapper.containerClass"),
      });
    }
  }

  public static initToolbar(): void {
    bodyStore.addBodyAttribute({
      qualifiedName: "data-kt-app-toolbar-enabled",
      value: "true",
    });

    if (objectPath.get(config.value, "toolbar.class")) {
      bodyStore.addClassName({
        position: "toolbar",
        className: objectPath.get(config.value, "toolbar.class"),
      });
    }

    if (objectPath.get(config.value, "toolbar.container") === "fixed") {
      bodyStore.addClassName({
        position: "toolbar-container",
        className: "container-xxl",
      });
    } else if (objectPath.get(config.value, "toolbar.container") === "fluid") {
      bodyStore.addClassName({
        position: "toolbar-container",
        className: "container-fluid",
      });
    }

    if (objectPath.get(config.value, "toolbar.containerClass")) {
      bodyStore.addClassName({
        position: "toolbar-container",
        className: objectPath.get(config.value, "toolbar.containerClass"),
      });
    }

    if (objectPath.get(config.value, "toolbar.fixed.desktop")) {
      bodyStore.addBodyAttribute({
        qualifiedName: "data-kt-app-toolbar-fixed",
        value: "true",
      });
    }

    if (objectPath.get(config.value, "toolbar.fixed.mobile")) {
      bodyStore.addBodyAttribute({
        qualifiedName: "data-kt-app-toolbar-fixed-mobile",
        value: "true",
      });
    }
  }

  public static initSidebar(): void {
    if (!objectPath.get(config.value, "sidebar.display")) {
      return;
    }

    bodyStore.addBodyAttribute({
      qualifiedName: "data-kt-app-sidebar-enabled",
      value: "true",
    });

    bodyStore.addBodyAttribute({
      qualifiedName: "data-kt-app-sidebar-fixed",
      value: "true",
    });

    if (
      objectPath.get(config.value, "sidebar.default.minimize.desktop.default")
    ) {
      bodyStore.addBodyAttribute({
        qualifiedName: "data-kt-app-sidebar-minimize",
        value: "on",
      });
    }

    if (
      objectPath.get(config.value, "sidebar.default.minimize.desktop.hoverable")
    ) {
      bodyStore.addBodyAttribute({
        qualifiedName: "data-kt-app-sidebar-hoverable",
        value: "true",
      });
    }

    bodyStore.addBodyAttribute({
      qualifiedName: "data-kt-app-sidebar-push-header",
      value: "true",
    });

    bodyStore.addBodyAttribute({
      qualifiedName: "data-kt-app-sidebar-push-toolbar",
      value: "true",
    });

    bodyStore.addBodyAttribute({
      qualifiedName: "data-kt-app-sidebar-push-footer",
      value: "true",
    });

    if (
      objectPath.get(config.value, "sidebar.primary.minimize.desktop.enabled")
    ) {
      if (
        objectPath.get(config.value, "sidebar.primary.minimize.desktop.default")
      ) {
        bodyStore.addBodyAttribute({
          qualifiedName: "data-kt-app-sidebar-primary-minimize",
          value: "on",
        });
      }

      if (
        objectPath.get(
          config.value,
          "sidebar.primary.minimize.desktop.hoverable"
        )
      ) {
        bodyStore.addBodyAttribute({
          qualifiedName: "data-kt-app-sidebar-primary-hoverable",
          value: "on",
        });
      }

      if (
        objectPath.get(config.value, "sidebar.primary.minimize.mobile.enabled")
      ) {
        if (
          objectPath.get(
            config.value,
            "sidebar.primary.minimize.desktop.default"
          )
        ) {
          bodyStore.addBodyAttribute({
            qualifiedName: "data-kt-app-sidebar-primary-minimize-mobile",
            value: "on",
          });
        }

        if (
          objectPath.get(
            config.value,
            "sidebar.primary.minimize.mobile.hoverable"
          )
        ) {
          bodyStore.addBodyAttribute({
            qualifiedName: "data-kt-app-sidebar-primary-hoverable-mobile",
            value: "on",
          });
        }
      }

      if (
        objectPath.get(config.value, "sidebar.primary.collapse.desktop.enabled")
      ) {
        if (
          objectPath.get(
            config.value,
            "sidebar.primary.collapse.desktop.default"
          )
        ) {
          bodyStore.addBodyAttribute({
            qualifiedName: "data-kt-app-sidebar-primary-collapse",
            value: "on",
          });
        }
      }

      if (
        objectPath.get(config.value, "sidebar.primary.collapse.mobile.enabled")
      ) {
        if (
          objectPath.get(
            config.value,
            "sidebar.primary.collapse.mobile.default"
          )
        ) {
          bodyStore.addBodyAttribute({
            qualifiedName: "data-kt-app-sidebar-primary-collapse-mobile",
            value: "on",
          });
        }
      }
    }
  }

  public static initSidebarPanel(): void {
    if (objectPath.get(config.value, "sidebarPanel.class")) {
      bodyStore.addClassName({
        position: "sidebar-panel",
        className: objectPath.get(config.value, "sidebarPanel.class"),
      });
    }

    if (objectPath.get(config.value, "sidebarPanel.fixed.desktop")) {
      bodyStore.addBodyAttribute({
        qualifiedName: "data-kt-app-sidebar-panel-fixed",
        value: "true",
      });
    } else {
      bodyStore.addBodyAttribute({
        qualifiedName: "data-kt-app-sidebar-panel-fixed",
        value: "false",
      });
    }

    if (objectPath.get(config.value, "sidebarPanel.minimize.desktop.enabled")) {
      if (
        objectPath.get(config.value, "sidebarPanel.minimize.desktop.default")
      ) {
        bodyStore.addBodyAttribute({
          qualifiedName: "data-kt-app-sidebar-panel-minimize",
          value: "on",
        });
      }

      if (
        objectPath.get(config.value, "sidebarPanel.minimize.desktop.hoverable")
      ) {
        bodyStore.addBodyAttribute({
          qualifiedName: "data-kt-app-sidebar-panel-hoverable",
          value: "on",
        });
      }

      if (
        objectPath.get(config.value, "sidebarPanel.minimize.mobile.enabled")
      ) {
        if (
          objectPath.get(
            config.value,
            "sidebarPanel.minimize.desktop.hoverable"
          )
        ) {
          bodyStore.addBodyAttribute({
            qualifiedName: "data-kt-app-sidebar-panel-hoverable",
            value: "on",
          });
        }
      }
    }
  }

  public static initHeader(): void {
    if (!objectPath.get(config.value, "header.display")) {
      return;
    }

    if (objectPath.get(config.value, "header.default.fixed.desktop")) {
      bodyStore.addBodyAttribute({
        qualifiedName: "data-kt-app-header-fixed",
        value: "true",
      });
    }

    if (objectPath.get(config.value, "header.default.fixed.mobile")) {
      bodyStore.addBodyAttribute({
        qualifiedName: "data-kt-app-header-fixed-mobile",
        value: "true",
      });
    }
  }

  public static initFooter(): void {
    if (objectPath.get(config.value, "footer.fixed.desktop")) {
      bodyStore.addBodyAttribute({
        qualifiedName: "data-kt-app-footer-fixed",
        value: "true",
      });
    }

    if (objectPath.get(config.value, "footer.fixed.mobile")) {
      bodyStore.addBodyAttribute({
        qualifiedName: "data-kt-app-footer-fixed-mobile",
        value: "true",
      });
    }
  }

  public static emptyElementClassesAndAttributes(element: HTMLElement): void {
    element.className = "";
    for (let i = element.attributes.length; i-- > 0; )
      element.removeAttributeNode(element.attributes[i]);
  }
}

export default LayoutService;
