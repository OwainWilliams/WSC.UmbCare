import { html as n, customElement as i } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as c } from "@umbraco-cms/backoffice/modal";
import "./breathing-countdown-DgocN1ko.js";
var u = Object.getOwnPropertyDescriptor, m = (e, t, o, r) => {
  for (var l = r > 1 ? void 0 : r ? u(t, o) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (l = d(l) || l);
  return l;
};
let s = class extends c {
  constructor() {
    super();
  }
  handleClose() {
    var e;
    (e = this.modalContext) == null || e.reject({ type: "close" });
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), setTimeout(() => {
      var o;
      const t = (o = this.shadowRoot) == null ? void 0 : o.getElementById("closeModal");
      t && (t.disabled = !1);
    }, (e = this.data) == null ? void 0 : e.disableForSeconds);
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
s = m([
  i("breath-modal")
], s);
const v = s;
export {
  s as breathModal,
  v as default
};
//# sourceMappingURL=breath-modal.element-B4n2egmf.js.map
