const a = [
  {
    name: "WSCUmb Care Entrypoint",
    alias: "WSC.UmbCare.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-BcMZGnmm.js")
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
}, n = [t], o = [
  {
    type: "headerApp",
    alias: "WSCUmbCare.HeaderApp",
    name: "WSCUmbCare Header App",
    kind: "button",
    element: () => import("./headerapp.element-DxEaVpwd.js"),
    meta: {
      label: "WSCUmbCare",
      icon: "icon-brain",
      href: "#"
    }
  }
], m = [
  ...a,
  ...e,
  ...n,
  ...o
];
export {
  m as manifests
};
//# sourceMappingURL=wsc-umb-care.js.map
