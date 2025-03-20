export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "headerApp",
    alias: "WSCUmbCare.HeaderApp",
    name: "WSCUmbCare Header App",
    kind: "button",
    element:  () => import("./headerapp.element.ts"),
    meta: {
      label: "WSCUmbCare",
      icon: "icon-brain",
      href: "#"
    }
  }
];
