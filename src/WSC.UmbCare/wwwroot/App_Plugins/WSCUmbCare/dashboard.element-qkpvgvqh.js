import { LitElement as _, html as m, customElement as h } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as c } from "@umbraco-cms/backoffice/element-api";
import { UmbModalToken as v, UMB_MODAL_MANAGER_CONTEXT as u } from "@umbraco-cms/backoffice/modal";
const E = new v("breath-modal", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var M = Object.getOwnPropertyDescriptor, d = (e) => {
  throw TypeError(e);
}, f = (e, t, a, i) => {
  for (var r = i > 1 ? void 0 : i ? M(t, a) : t, n = e.length - 1, l; n >= 0; n--)
    (l = e[n]) && (r = l(r) || r);
  return r;
}, p = (e, t, a) => t.has(e) || d("Cannot " + a), g = (e, t, a) => (p(e, t, "read from private field"), t.get(e)), x = (e, t, a) => t.has(e) ? d("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), C = (e, t, a, i) => (p(e, t, "write to private field"), t.set(e, a), a), o;
let s = class extends c(_) {
  constructor() {
    super(), x(this, o), this._triggerModal = () => {
      var e;
      (e = g(this, o)) == null || e.open(this, E, {
        data: {
          headline: "Relaxation time"
        }
      });
    }, this.consumeContext(u, (e) => {
      C(this, o, e);
    });
  }
  render() {
    return m`
  
  <uui-button look="primary" color="positive" id="openModal" label="Close" @click="${this._triggerModal}">Open modal</uui-button>

    `;
  }
};
o = /* @__PURE__ */ new WeakMap();
s = f([
  h("example-dashboard")
], s);
const D = s;
export {
  s as ExampleDashboardElement,
  D as default
};
//# sourceMappingURL=dashboard.element-qkpvgvqh.js.map
