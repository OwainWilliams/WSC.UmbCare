import { html as s, customElement as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as d } from "@umbraco-cms/backoffice/modal";
import "./headerapp-DJ-iQBa8.js";
var m = Object.getOwnPropertyDescriptor, u = (t, l, n, p) => {
  for (var e = p > 1 ? void 0 : p ? m(l, n) : l, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (e = o(e) || e);
  return e;
};
let a = class extends d {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return s`
   <headerapp-element></headerapp-element>

    `;
  }
};
a = u([
  c("headerapp-modal")
], a);
const b = a;
export {
  b as default,
  a as headerappModal
};
//# sourceMappingURL=headerapp-modal.element-BpxtRvsF.js.map
