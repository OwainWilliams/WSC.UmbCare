import { LitElement as u, html as d, customElement as p } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as _ } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT as v } from "@umbraco-cms/backoffice/modal";
import { B as g } from "./breathing-countdown-modal.token-BaRikk8L.js";
var O = Object.getOwnPropertyDescriptor, f = (e, t, r, l) => {
  for (var s = l > 1 ? void 0 : l ? O(t, r) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (s = o(s) || s);
  return s;
};
let c = class extends _(u) {
  constructor() {
    super(...arguments), this._isBluescreenOn = !1, this._triggerBluescreen = () => {
      console.log("bluescreen button");
      const e = document.body;
      this._isBluescreenOn ? (e.style.filter = "", e.style.backgroundColor = "", e.style.color = "") : (e.style.filter = "hue-rotate(180deg)", e.style.backgroundColor = "blue", e.style.color = "white"), this._isBluescreenOn = !this._isBluescreenOn, this.requestUpdate();
    };
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return d`
   <uui-button look="primary" color="positive" id="blueScreen" label="Open" @click="${this._triggerBluescreen}">
         ${this._isBluescreenOn ? "Bluescreen On" : "Bluescreen Off"}
   </uui-button>
    `;
  }
};
c = f([
  p("bluescreen-element")
], c);
var b = Object.getOwnPropertyDescriptor, h = (e) => {
  throw TypeError(e);
}, y = (e, t, r, l) => {
  for (var s = l > 1 ? void 0 : l ? b(t, r) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (s = o(s) || s);
  return s;
}, m = (e, t, r) => t.has(e) || h("Cannot " + r), E = (e, t, r) => (m(e, t, "read from private field"), t.get(e)), B = (e, t, r) => t.has(e) ? h("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), C = (e, t, r, l) => (m(e, t, "write to private field"), t.set(e, r), r), a;
let i = class extends _(u) {
  constructor() {
    super(), B(this, a), this._triggerModal = () => {
      var e;
      (e = E(this, a)) == null || e.open(this, g, {
        data: {
          headline: "Relaxation time",
          disableForSeconds: 3e4
        }
      });
    }, this.consumeContext(v, (e) => {
      C(this, a, e);
    });
  }
  render() {
    return d`
  
  <uui-button look="primary" color="positive" id="openModal" label="Open" @click="${this._triggerModal}">Open modal</uui-button>
  <bluescreen-element></bluescreen-element>
    `;
  }
};
a = /* @__PURE__ */ new WeakMap();
i = y([
  p("example-dashboard")
], i);
const D = i;
export {
  i as ExampleDashboardElement,
  D as default
};
//# sourceMappingURL=dashboard.element-HhSnFenQ.js.map
