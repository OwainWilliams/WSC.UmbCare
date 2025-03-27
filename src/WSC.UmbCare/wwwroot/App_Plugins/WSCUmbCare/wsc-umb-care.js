const a = [
  {
    name: "WSCUmb Care Entrypoint",
    alias: "WSC.UmbCare.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-CDySAYsf.js")
  }
], e = [
  {
    name: "WSCUmb Care Dashboard",
    alias: "WSC.UmbCare.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element-DqAv9Dpy.js"),
    meta: {
      label: "Example Dashboard",
      pathname: "example-dashboard"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  }
], t = {
  type: "modal",
  alias: "breath-modal",
  name: "Breath Modal",
  js: () => import("./breath-modal.element-B4n2egmf.js")
}, o = [t], n = {
  type: "modal",
  alias: "headerapp-modal",
  name: "Headerapp Modal",
  js: () => import("./headerapp-modal.element-BpxtRvsF.js")
}, m = [n], s = [
  {
    type: "headerApp",
    alias: "WSCUmbCare.HeaderApp",
    name: "WSCUmbCare Header App",
    kind: "button",
    element: () => import("./headerapp.element-6n9LvbLE.js"),
    meta: {
      label: "WSCUmbCare",
      icon: "icon-brain",
      href: "#"
    }
  }
], i = [
  ...a,
  ...e,
  ...o,
  ...m,
  ...s
];
export {
  i as manifests
};
//# sourceMappingURL=wsc-umb-care.js.map
