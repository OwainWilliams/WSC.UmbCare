import { UmbHeaderAppButtonElement as h } from "@umbraco-cms/backoffice/components";
import { html as m, css as g, state as p, customElement as v } from "@umbraco-cms/backoffice/external/lit";
import { W as k } from "./services.gen-BHDE9gha.js";
import { UMB_ACTION_EVENT_CONTEXT as u } from "@umbraco-cms/backoffice/action";
var f = Object.defineProperty, w = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, o = (t, e, r, i) => {
  for (var s = i > 1 ? void 0 : i ? w(e, r) : e, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (s = (i ? l(e, r, s) : l(s)) || s);
  return i && s && f(e, r, s), s;
}, b = (t, e, r) => e.has(t) || d("Cannot " + r), C = (t, e, r) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), E = (t, e, r) => (b(t, e, "access private method"), r), c, _;
let a = class extends h {
  constructor() {
    super(), C(this, c), this._progress = 0, this._breakInterval = 14e4, this.consumeContext(u, (t) => {
      this._actionEventContext = t, this._actionEventContext.addEventListener("mindscape-break-complete", () => {
        this._lastBreak = /* @__PURE__ */ new Date(), console.log("Break complete");
      });
    });
  }
  set _lastBreak(t) {
    localStorage.setItem("mindscape_lastbreak", t.toUTCString());
  }
  get _lastBreak() {
    const t = localStorage.getItem("mindscape_lastbreak");
    return t ? new Date(t) : void 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._initTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clearTimer();
  }
  async _initTimer() {
    this._lastLogin = await this._getLastLogin() || /* @__PURE__ */ new Date(), (!this._lastBreak || this._lastLogin > this._lastBreak) && (this._lastBreak = this._lastLogin), this._startTimer();
  }
  _startTimer() {
    this._timer = setInterval(() => {
      const t = this._progress;
      this._updateProgress(), t < 100 && this._progress >= 100 && this._dispatchBreakEvent();
    }, 1e3);
  }
  // private _isDueBreak()
  // {
  //   if (!this._lastBreak) return false;
  //   const now = new Date();
  //   const diff = now.getTime() - this._lastBreak.getTime();
  //   return diff >= this._breakInterval;
  // }
  _clearTimer() {
    clearInterval(this._timer);
  }
  async _getLastLogin() {
    const { data: t, error: e } = await k.lastLogin();
    if (e) {
      console.error(e);
      return;
    }
    if (t !== void 0)
      return new Date(t);
  }
  _updateProgress() {
    const e = (/* @__PURE__ */ new Date()).getTime() - this._lastBreak.getTime();
    this._progress = Math.min(e / this._breakInterval * 100, 100);
  }
  _dispatchBreakEvent() {
    var t;
    (t = this._actionEventContext) == null || t.dispatchEvent(new CustomEvent("mindscape-break"));
  }
  render() {
    return m`
			<button @click=${E(this, c, _)}>
        <svg id="progress-bar" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" class="${this._progress >= 100 ? "pulse" : ""}">
          <circle id="bg" cx="50%" cy="50%" r="18.5" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="1.5"></circle>
          <circle id="progress" cx="50%" cy="50%" r="18.5" fill="none" stroke="currentColor" stroke-width="1.5" style="transform-origin: 50% 50%; rotate: 90deg; stroke-dasharray: ${this._progress / 100 * 115}, 115; stroke-linecap: round; transition: stroke-dasharray 120ms;"></circle>
        </svg>
        <svg id="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
			</button>
		`;
  }
};
c = /* @__PURE__ */ new WeakSet();
_ = function() {
  this._dispatchBreakEvent();
};
a.styles = [
  h.styles,
  g`
      :host {
      }
      button {
        display: inline-block;
        position: relative;
        height: 34px;
        width: 34px;
        background-color: transparent;
        border: none;
        padding: 0;
        color: white;
        font-size: 14px;
        vertical-align: middle;
        cursor: pointer;
      }
      .pulse {
        transform: scale(1);
        animation: pulse 1.5s infinite;
      }
      svg#icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1.125em;
        height: 1.125em;
      }
      @keyframes pulse {
        0% {
          transform: scale(1);
        }

        50% {
          transform: scale(1.2);
        }

        100% {
          transform: scale(1);
        }
      }
    `
];
o([
  p()
], a.prototype, "_lastLogin", 2);
o([
  p()
], a.prototype, "_lastBreak", 1);
o([
  p()
], a.prototype, "_progress", 2);
a = o([
  v("mindscape-header-app")
], a);
const M = a;
export {
  a as HeaderAppElement,
  M as default
};
//# sourceMappingURL=headerapp.element-DxEaVpwd.js.map
