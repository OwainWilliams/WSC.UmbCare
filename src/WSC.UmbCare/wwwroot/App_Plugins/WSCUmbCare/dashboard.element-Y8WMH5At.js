import { LitElement as c, html as u, css as h, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as g } from "@umbraco-cms/backoffice/element-api";
import { UmbModalToken as f, UMB_MODAL_MANAGER_CONTEXT as x } from "@umbraco-cms/backoffice/modal";
const b = new f("breath-modal", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var v = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, _ = (t, e, o, l) => {
  for (var a = l > 1 ? void 0 : l ? v(e, o) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (a = s(a) || a);
  return a;
}, p = (t, e, o) => e.has(t) || d("Cannot " + o), k = (t, e, o) => (p(t, e, "read from private field"), e.get(t)), y = (t, e, o) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, o), w = (t, e, o, l) => (p(t, e, "write to private field"), e.set(t, o), o), r;
let i = class extends g(c) {
  constructor() {
    super(), y(this, r), this._triggerModal = () => {
      var t;
      (t = k(this, r)) == null || t.open(this, b, {
        data: {
          headline: "my headline"
        }
      });
    }, this.consumeContext(x, (t) => {
      w(this, r, t);
    });
  }
  render() {
    return u`
  
  <uui-button look="primary" color="positive" id="openModal" label="Close" @click="${this._triggerModal}">Open modal</uui-button>

    `;
  }
};
r = /* @__PURE__ */ new WeakMap();
i.styles = [
  h`
            :host {
                display: grid;
                gap: var(--uui-size-layout-1);
                padding: var(--uui-size-layout-1);
                grid-template-columns: 1fr 1fr 1fr;
            }

            uui-box {
                margin-bottom: var(--uui-size-layout-1);
            }

            h2 {
                margin-top:0;
            }

            .wide {
                grid-column: span 3;
            }

             .modal {
                display: block;
                position: fixed;
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgb(0,0,0);
                background-color: rgba(0,0,0,0.4);
            }

            .modal-content {
                background-color: #fefefe;
                margin: 15% auto;
                padding: 20px;
                border: 1px solid #888;
                width: 40%;
            }

            .close {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
            }

            .close:hover,
            .close:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }

                    .container {
            position: relative;
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
        }

         .breath-box {
            width: 100px;
            height: 100px;
            background-color: lightblue;
            border-radius: 10px;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5em;
            color: darkblue;
        }

        .ball {
            width: 20px;
            height: 20px;
            background-color: darkblue;
            border-radius: 50%;
            position: absolute;
            animation: roll 16s infinite;
            animation-play-state: paused;
        }


        @keyframes roll {
            0% {
                top: 0;
                left: 0;
            }
            25% {
                top: 0;
                left: 80px;
            }
            50% {
                top: 80px;
                left: 80px;
            }
            75% {
                top: 80px;
                left: 0;
            }
            100% {
                top: 0;
                left: 0;
            }
        }

        .breath-text {
            font-size: 1.2em;
            color: darkblue;
        }

        .countdown {
            font-size: 2em;
            color: darkblue;
            margin-bottom: 20px;
        }

    `
];
i = _([
  m("example-dashboard")
], i);
const C = i;
export {
  i as ExampleDashboardElement,
  C as default
};
//# sourceMappingURL=dashboard.element-Y8WMH5At.js.map
