import { LitElement as u, html as d, customElement as p } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as _ } from "@umbraco-cms/backoffice/element-api";
import { UmbModalToken as v, UMB_MODAL_MANAGER_CONTEXT as g } from "@umbraco-cms/backoffice/modal";
const b = new v("breath-modal", {
  modal: {
    type: "dialog"
  }
});
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
var y = Object.getOwnPropertyDescriptor, h = (e) => {
  throw TypeError(e);
}, E = (e, t, r, l) => {
  for (var s = l > 1 ? void 0 : l ? y(t, r) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (s = o(s) || s);
  return s;
}, m = (e, t, r) => t.has(e) || h("Cannot " + r), B = (e, t, r) => (m(e, t, "read from private field"), t.get(e)), C = (e, t, r) => t.has(e) ? h("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), M = (e, t, r, l) => (m(e, t, "write to private field"), t.set(e, r), r), a;
let i = class extends _(u) {
  constructor() {
    super(), C(this, a), this._triggerModal = () => {
      var e;
      (e = B(this, a)) == null || e.open(this, b, {
        data: {
          headline: "Relaxation time",
          disableForSeconds: 3e4
        }
      });
    }, this.consumeContext(g, (e) => {
      M(this, a, e);
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
i = E([
  p("example-dashboard")
], i);
const D = i;
export {
  i as ExampleDashboardElement,
  D as default
};
//# sourceMappingURL=dashboard.element-DqAv9Dpy.js.map
