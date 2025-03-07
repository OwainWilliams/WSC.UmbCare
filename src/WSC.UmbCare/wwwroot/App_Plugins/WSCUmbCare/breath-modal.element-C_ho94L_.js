import { html as n, customElement as i } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as u } from "@umbraco-cms/backoffice/modal";
import "./breathing-countdown-BK6c2s_0.js";
var c = Object.getOwnPropertyDescriptor, d = (e, r, m, s) => {
  for (var t = s > 1 ? void 0 : s ? c(r, m) : r, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (t = a(t) || t);
  return t;
};
let l = class extends u {
  constructor() {
    super();
  }
  handleClose() {
    var e;
    (e = this.modalContext) == null || e.reject({ type: "close" });
  }
  render() {
    return n`
    <umb-body-layout headline="Relax">

        <my-typescript-element></my-typescript-element>

<div slot="actions">
  <uui-button look="primary" color="positive" id="closeModal" @click="${this.handleClose}">Close</uui-button>
</div>
      </umb-body-layout>
         `;
  }
};
l = d([
  i("breath-modal")
], l);
const h = l;
export {
  l as breathModel,
  h as default
};
//# sourceMappingURL=breath-modal.element-C_ho94L_.js.map
