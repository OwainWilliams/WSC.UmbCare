import { LitElement as y, html as p, css as w, state as h, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as k } from "@umbraco-cms/backoffice/element-api";
import { W as f } from "./services.gen-CH-rdfn7.js";
import { UMB_NOTIFICATION_CONTEXT as E } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT as W } from "@umbraco-cms/backoffice/current-user";
function U(e) {
  const t = e.querySelector(".countdown"), o = e.querySelector(".ball"), r = e.querySelector(".breath-text"), a = e.querySelector(".box-countdown");
  t.textContent = "It's time to breathe";
  const i = ["Inhale", "Hold", "Exhale", "Hold"];
  let n = 0, l = 4;
  r.textContent = i[n], a.textContent = l.toString(), setInterval(() => {
    n = (n + 1) % i.length, r.textContent = i[n], l = 5, a.textContent = l.toString(), o.style.animationPlayState = "running";
  }, 4e3), setInterval(() => {
    l > 0 && (l--, a.textContent = l.toString());
  }, 1e3);
}
var M = Object.defineProperty, T = Object.getOwnPropertyDescriptor, _ = (e) => {
  throw TypeError(e);
}, u = (e, t, o, r) => {
  for (var a = r > 1 ? void 0 : r ? T(t, o) : t, i = e.length - 1, n; i >= 0; i--)
    (n = e[i]) && (a = (r ? n(t, o, a) : n(a)) || a);
  return r && a && M(t, o, a), a;
}, g = (e, t, o) => t.has(e) || _("Cannot " + o), c = (e, t, o) => (g(e, t, "read from private field"), o ? o.call(e) : t.get(e)), m = (e, t, o) => t.has(e) ? _("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), S = (e, t, o, r) => (g(e, t, "write to private field"), t.set(e, o), o), d, b, v, x;
let s = class extends k(y) {
  constructor() {
    super(), this._yourName = "Press the button!", this._serverUserData = void 0, this._contextCurrentUser = void 0, this._showModal = !1, m(this, d), m(this, b, async (e) => {
      var a, i;
      const t = e.target;
      t.state = "waiting";
      const { data: o, error: r } = await f.whoAmI();
      if (r) {
        t.state = "failed", console.error(r);
        return;
      }
      o !== void 0 && (this._serverUserData = o, t.state = "success"), c(this, d) && c(this, d).peek("warning", {
        data: {
          headline: `You are ${(a = this._serverUserData) == null ? void 0 : a.name}`,
          message: `Your email is ${(i = this._serverUserData) == null ? void 0 : i.email}`
        }
      });
    }), m(this, v, async (e) => {
      const t = e.target;
      t.state = "waiting";
      const { data: o, error: r } = await f.whatsTheTimeMrWolf();
      if (r) {
        t.state = "failed", console.error(r);
        return;
      }
      o !== void 0 && (this._timeFromMrWolf = new Date(o), t.state = "success");
    }), m(this, x, async (e) => {
      const t = e.target;
      t.state = "waiting", this._showModal = !0, setTimeout(() => U(this.shadowRoot), 1);
      const { data: o, error: r } = await f.whatsMyName();
      if (r) {
        t.state = "failed", console.error(r);
        return;
      }
      this._yourName = o, t.state = "success";
    }), this.consumeContext(E, (e) => {
      S(this, d, e);
    }), this.consumeContext(W, (e) => {
      this.observe(e.currentUser, (t) => {
        this._contextCurrentUser = t;
      });
    });
  }
  render() {
    var e, t, o;
    return p`
        <uui-box headline="Who am I?">
            <div slot="header">[Server]</div>
            <h2><uui-icon name="icon-user"></uui-icon>${(e = this._serverUserData) != null && e.email ? this._serverUserData.email : "Press the button!"}</h2>
            <ul>
                ${(t = this._serverUserData) == null ? void 0 : t.groups.map((r) => p`<li>${r.name}</li>`)}
            </ul>
            <uui-button color="default" look="primary" @click="${c(this, b)}">
                Who am I?
            </uui-button>
            <p>This endpoint gets your current user from the server and displays your email and list of user groups.
            It also displays a Notification with your details.</p>
        </uui-box>

        <uui-box headline="What's my Name?">
            <div slot="header">[Server]</div>
            <h2><uui-icon name="icon-user"></uui-icon> ${this._yourName}</h2>
            <uui-button color="default" look="primary" @click="${c(this, x)}">
                Whats my name?
            </uui-button>
            <p>This endpoint has a forced delay to show the button 'waiting' state for a few seconds before completing the request.</p>
        </uui-box>

        <uui-box headline="What's the Time?">
            <div slot="header">[Server]</div>
            <h2><uui-icon name="icon-alarm-clock"></uui-icon> ${this._timeFromMrWolf ? this._timeFromMrWolf.toLocaleString() : "Press the button!"}</h2>
            <uui-button color="default" look="primary" @click="${c(this, v)}">
                Whats the time Mr Wolf?
            </uui-button>
            <p>This endpoint gets the current date and time from the server.</p>
        </uui-box>

        <uui-box headline="Who am I?" class="wide">
          <div slot="header">[Context]</div>
          <p>Current user email: <b>${(o = this._contextCurrentUser) == null ? void 0 : o.email}</b></p>
          <p>This is the JSON object available by consuming the 'UMB_CURRENT_USER_CONTEXT' context:</p>
          <umb-code-block language="json" copy>${JSON.stringify(this._contextCurrentUser, null, 2)}</umb-code-block>
        </uui-box>

        ${this._showModal ? p`
         <div class="modal">
  <div class="modal-content">
      <div class="countdown">It's time to breathe</div>
    <div class="container">
        <div class="breath-box">
            <div class="box-countdown">4</div>
        </div>
        <div class="ball"></div>
    </div>
    <div class="breath-text">Inhale</div>
  </div>
</div>

        ` : ""}
    `;
  }
};
d = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
x = /* @__PURE__ */ new WeakMap();
s.styles = [
  w`
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
u([
  h()
], s.prototype, "_yourName", 2);
u([
  h()
], s.prototype, "_timeFromMrWolf", 2);
u([
  h()
], s.prototype, "_serverUserData", 2);
u([
  h()
], s.prototype, "_contextCurrentUser", 2);
u([
  h()
], s.prototype, "_showModal", 2);
s = u([
  C("example-dashboard")
], s);
const z = s;
export {
  s as ExampleDashboardElement,
  z as default
};
//# sourceMappingURL=dashboard.element-hJTavXBG.js.map
