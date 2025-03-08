const a = [
  {
    name: "WSCUmb Care Entrypoint",
    alias: "WSC.UmbCare.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-DxTxms_G.js")
  }
], t = [
  {
    name: "WSCUmb Care Dashboard",
    alias: "WSC.UmbCare.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element-CEsnvQwy.js"),
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
], o = {
  type: "modal",
  alias: "breath-modal",
  name: "Breath Modal",
  js: () => import("./breath-modal.element-B4n2egmf.js")
}, e = [o], n = [
  ...a,
  ...t,
  ...e
];
export {
  n as manifests
};
//# sourceMappingURL=wsc-umb-care.js.map
