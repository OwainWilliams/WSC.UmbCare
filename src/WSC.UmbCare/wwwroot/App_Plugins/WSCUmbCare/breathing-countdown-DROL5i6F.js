import { LitElement as s, html as d, css as c, customElement as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as p } from "@umbraco-cms/backoffice/element-api";
function b(n) {
  const r = n.querySelector(".ball"), a = n.querySelector(".breath-text"), l = n.querySelector(".box-countdown"), e = ["Inhale", "Hold", "Exhale", "Hold"];
  let o = 0, t = 4;
  a.textContent = e[o], l.textContent = t.toString(), setInterval(() => {
    o = (o + 1) % e.length, a.textContent = e[o], t = 5, l.textContent = t.toString(), r.style.animationPlayState = "running";
  }, 4e3), setInterval(() => {
    t > 0 && (t--, l.textContent = t.toString());
  }, 1e3);
}
var x = Object.getOwnPropertyDescriptor, m = (n, r, a, l) => {
  for (var e = l > 1 ? void 0 : l ? x(r, a) : r, o = n.length - 1, t; o >= 0; o--)
    (t = n[o]) && (e = t(e) || e);
  return e;
};
let i = class extends p(s) {
  connectedCallback() {
    super.connectedCallback(), setTimeout(() => b(this.shadowRoot), 2e3);
  }
  render() {
    return d`
    <div class="container">
            <div class="countdown"></div>
              <div class="breath-box">
                  <div class="box-countdown">4</div>
                  <div class="ball"></div>
              </div>
            <div class="breath-text"></div>
            </container>
        `;
  }
};
i.styles = [
  c`
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
            padding-top: 120px;
            text-align: center;
        }

        .countdown {
            font-size: 2em;
            color: darkblue;
            margin-bottom: 20px;
        }

    `
];
i = m([
  u("breath-square-element")
], i);
//# sourceMappingURL=breathing-countdown-DROL5i6F.js.map
