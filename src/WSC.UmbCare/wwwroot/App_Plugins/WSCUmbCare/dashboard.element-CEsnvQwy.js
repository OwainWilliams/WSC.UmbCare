import { LitElement as _, html as h, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as c } from "@umbraco-cms/backoffice/element-api";
import { UmbModalToken as v, UMB_MODAL_MANAGER_CONTEXT as u } from "@umbraco-cms/backoffice/modal";
const E = new v("breath-modal", {
  modal: {
    type: "dialog"
  }
});
var M = Object.getOwnPropertyDescriptor, d = (e) => {
  throw TypeError(e);
}, f = (e, t, a, n) => {
  for (var r = n > 1 ? void 0 : n ? M(t, a) : t, i = e.length - 1, l; i >= 0; i--)
    (l = e[i]) && (r = l(r) || r);
  return r;
}, p = (e, t, a) => t.has(e) || d("Cannot " + a), g = (e, t, a) => (p(e, t, "read from private field"), t.get(e)), x = (e, t, a) => t.has(e) ? d("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), C = (e, t, a, n) => (p(e, t, "write to private field"), t.set(e, a), a), o;
let s = class extends c(_) {
  constructor() {
    super(), x(this, o), this._triggerModal = () => {
      var e;
      (e = g(this, o)) == null || e.open(this, E, {
        data: {
          headline: "Relaxation time",
          disableForSeconds: 3e4
        }
      });
    }, this.consumeContext(u, (e) => {
      C(this, o, e);
    });
  }
  render() {
    return h`
  
  <uui-button look="primary" color="positive" id="openModal" label="Close" @click="${this._triggerModal}">Open modal</uui-button>

    `;
  }
};
o = /* @__PURE__ */ new WeakMap();
s = f([
  m("example-dashboard")
], s);
const D = s;
export {
  s as ExampleDashboardElement,
  D as default
};
//# sourceMappingURL=dashboard.element-CEsnvQwy.js.map
