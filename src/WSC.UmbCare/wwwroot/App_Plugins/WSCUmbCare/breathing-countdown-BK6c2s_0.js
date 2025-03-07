import { LitElement as c, html as d, css as u, customElement as p } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as b } from "@umbraco-cms/backoffice/element-api";
function m(e) {
  const r = e.querySelector(".countdown"), a = e.querySelector(".ball"), i = e.querySelector(".breath-text"), t = e.querySelector(".box-countdown");
  r.textContent = "It's time to breathe";
  const o = ["Inhale", "Hold", "Exhale", "Hold"];
  let n = 0, l = 4;
  i.textContent = o[n], t.textContent = l.toString(), setInterval(() => {
    n = (n + 1) % o.length, i.textContent = o[n], l = 5, t.textContent = l.toString(), a.style.animationPlayState = "running";
  }, 4e3), setInterval(() => {
    l > 0 && (l--, t.textContent = l.toString());
  }, 1e3);
}
var x = Object.getOwnPropertyDescriptor, h = (e, r, a, i) => {
  for (var t = i > 1 ? void 0 : i ? x(r, a) : r, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (t = n(t) || t);
  return t;
};
let s = class extends b(c) {
  connectedCallback() {
    super.connectedCallback(), setTimeout(() => m(this.shadowRoot), 4e3);
  }
  render() {
    return d`
            <div class="countdown">It's time to breathe</div>
                  <div class="container">
                <div class="breath-box">
                <div class="box-countdown">4</div>
              </div>
        <div class="ball"></div>
    </div>
    <div class="breath-text">Inhale</div>
        `;
  }
};
s.styles = [
  u`
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
s = h([
  p("my-typescript-element")
], s);
//# sourceMappingURL=breathing-countdown-BK6c2s_0.js.map
