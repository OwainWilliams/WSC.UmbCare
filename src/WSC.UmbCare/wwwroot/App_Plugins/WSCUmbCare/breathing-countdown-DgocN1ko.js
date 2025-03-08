import { LitElement as d, html as p, css as x, customElement as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as u } from "@umbraco-cms/backoffice/element-api";
function m(n) {
  const a = n.querySelector(".ball"), i = n.querySelector(".breath-text"), l = n.querySelector(".box-countdown"), e = ["Breathe In", "Hold", "Breathe Out", "Hold"];
  let o = 0, t = 4;
  const s = () => {
    o = (o + 1) % e.length, i.textContent = e[o], t = 5, l.textContent = t.toString(), a.style.animationPlayState = "running";
  }, c = () => {
    t > 0 && (t--, l.textContent = t.toString());
  };
  i.textContent = e[o], l.textContent = t.toString(), setInterval(s, 4e3), setInterval(c, 1e3);
}
var h = Object.getOwnPropertyDescriptor, f = (n, a, i, l) => {
  for (var e = l > 1 ? void 0 : l ? h(a, i) : a, o = n.length - 1, t; o >= 0; o--)
    (t = n[o]) && (e = t(e) || e);
  return e;
};
let r = class extends u(d) {
  connectedCallback() {
    super.connectedCallback(), setTimeout(() => m(this.shadowRoot), 2e3);
  }
  render() {
    return p`
    <div class="container">
      <div class="countdown"></div>
      <div class="breath-box">
        <div class="box-countdown">4</div>
        <div class="ball"></div>
      </div>
      <div class="breath-text"></div>
    </div>
        `;
  }
};
r.styles = [
  x`
            .container {
            position: relative;
            width: 300px;
            height: 100px;
            margin-bottom: 20px;
        }

         .breath-box {
            width: 100px;
            height: 100px;
            margin-left: 100px;
            background-color: #f5c1bc;
            border-radius: 10px;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5em;
            color: #3544b1;
        }

        .ball {
            width: 20px;
            height: 20px;
            background-color: #3544b1;
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
            color: #3544b1;
            padding-top: 120px;
            text-align: center;
        }

        .countdown {
            font-size: 2em;
            color: #3544b1;
            margin-bottom: 20px;
        }

    `
];
r = f([
  b("breath-square-element")
], r);
//# sourceMappingURL=breathing-countdown-DgocN1ko.js.map
