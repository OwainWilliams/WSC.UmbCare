import { html as n, customElement as i } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as u } from "@umbraco-cms/backoffice/modal";
import "./breathing-countdown-DROL5i6F.js";
var c = Object.getOwnPropertyDescriptor, m = (e, t, d, r) => {
  for (var o = r > 1 ? void 0 : r ? c(t, d) : t, l = e.length - 1, s; l >= 0; l--)
    (s = e[l]) && (o = s(o) || o);
  return o;
};
let a = class extends u {
  constructor() {
    super();
  }
  handleClose() {
    var e;
    (e = this.modalContext) == null || e.reject({ type: "close" });
  }
  connectedCallback() {
    super.connectedCallback(), setTimeout(() => {
      var t;
      const e = (t = this.shadowRoot) == null ? void 0 : t.getElementById("closeModal");
      e && (e.disabled = !1);
    }, 4e3);
  }
  render() {
    var e;
    return n`
    <umb-body-layout headline="${(e = this.data) == null ? void 0 : e.headline}">

        <breath-square-element></breath-square-element>

<div slot="actions">
  <uui-button look="primary" color="positive" id="closeModal" @click="${this.handleClose}" disabled="true">Close</uui-button>
</div>
      </umb-body-layout>
         `;
  }
};
a = m([
  i("breath-modal")
], a);
const v = a;
export {
  a as breathModal,
  v as default
};
//# sourceMappingURL=breath-modal.element-C-fxEk_I.js.map
