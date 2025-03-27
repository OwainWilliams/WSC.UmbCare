import { UMB_AUTH_CONTEXT as a } from "@umbraco-cms/backoffice/auth";
import { c as o } from "./services.gen-BHDE9gha.js";
import "./breathing-countdown-DgocN1ko.js";
import "./headerapp-DJ-iQBa8.js";
const f = (e, s) => {
  e.consumeContext(a, async (i) => {
    const t = i.getOpenApiConfiguration();
    o.setConfig({
      baseUrl: t.base,
      credentials: t.credentials
    }), o.interceptors.request.use(async (n, c) => {
      const r = await t.token();
      return n.headers.set("Authorization", `Bearer ${r}`), n;
    });
  });
}, l = (e, s) => {
};
export {
  f as onInit,
  l as onUnload
};
//# sourceMappingURL=entrypoint-CDySAYsf.js.map
