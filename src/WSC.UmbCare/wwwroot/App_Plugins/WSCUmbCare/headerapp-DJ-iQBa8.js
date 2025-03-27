import { LitElement as o, html as p, css as a, customElement as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as h } from "@umbraco-cms/backoffice/element-api";
var v = Object.getOwnPropertyDescriptor, d = (n, s, m, i) => {
  for (var e = i > 1 ? void 0 : i ? v(s, m) : s, t = n.length - 1, l; t >= 0; t--)
    (l = n[t]) && (e = l(e) || e);
  return e;
};
let r = class extends h(o) {
  render() {
    return p`
    <div class="container">
      <h1>test</h1>
    </div>
        `;
  }
};
r.styles = [
  a`
            .container {
            position: relative;
            width: 300px;
            height: 100px;
            margin-bottom: 20px;
        }
    `
];
r = d([
  c("headerapp-element")
], r);
//# sourceMappingURL=headerapp-DJ-iQBa8.js.map
