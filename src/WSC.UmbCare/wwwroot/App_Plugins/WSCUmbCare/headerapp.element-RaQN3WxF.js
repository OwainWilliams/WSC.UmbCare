import { UmbHeaderAppButtonElement as v } from "@umbraco-cms/backoffice/components";
import { html as w, css as f, state as u, customElement as k } from "@umbraco-cms/backoffice/external/lit";
import { UMB_ACTION_EVENT_CONTEXT as M } from "@umbraco-cms/backoffice/action";
import { UmbModalToken as E, UMB_MODAL_MANAGER_CONTEXT as C } from "@umbraco-cms/backoffice/modal";
import { B as T } from "./breathing-countdown-modal.token-BaRikk8L.js";
const x = new E("headerapp-modal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
var A = Object.defineProperty, b = Object.getOwnPropertyDescriptor, _ = (e) => {
  throw TypeError(e);
}, m = (e, t, r, a) => {
  for (var s = a > 1 ? void 0 : a ? b(t, r) : t, n = e.length - 1, l; n >= 0; n--)
    (l = e[n]) && (s = (a ? l(t, r, s) : l(s)) || s);
  return a && s && A(t, r, s), s;
}, p = (e, t, r) => t.has(e) || _("Cannot " + r), h = (e, t, r) => (p(e, t, "read from private field"), t.get(e)), c = (e, t, r) => t.has(e) ? _("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), B = (e, t, r, a) => (p(e, t, "write to private field"), t.set(e, r), r), y = (e, t, r) => (p(e, t, "access private method"), r), i, d, g;
let o = class extends v {
  constructor() {
    super(), c(this, d), c(this, i), this._progress = 0, this._breakInterval = 6e4, this._lastBreak = /* @__PURE__ */ new Date(), this._triggerBreathModal = () => {
      var e;
      (e = h(this, i)) == null || e.open(this, T, {
        data: {
          headline: "Relaxation time",
          disableForSeconds: 3e4
        }
      });
    }, this._triggerSettingsModal = () => {
      var e;
      (e = h(this, i)) == null || e.open(this, x, {
        data: {
          headline: "Settings"
        }
      });
    }, this._onModalClosed = () => {
      this._lastBreak = /* @__PURE__ */ new Date(), this._progress = 0, this._clearTimer(), this._initTimer();
    }, this.consumeContext(M, (e) => {
      var t;
      this._actionEventContext = e, (t = this._actionEventContext) == null || t.addEventListener("mindscape-break-complete", () => {
        this._lastBreak = /* @__PURE__ */ new Date();
      });
    }), this.consumeContext(C, (e) => {
      B(this, i, e);
    });
  }
  connectedCallback() {
    super.connectedCallback(), this._initTimer(), window.addEventListener("headerapp-modal-closed", this._onModalClosed);
  }
  async _initTimer() {
    this._progress >= 100 && (this._lastBreak = /* @__PURE__ */ new Date(), this._progress = 0), this._startTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clearTimer(), window.removeEventListener("headerapp-modal-closed", this._onModalClosed);
  }
  _startTimer() {
    this._timer = setInterval(() => {
      var t;
      const e = this._progress;
      this._updateProgress(), e < 100 && this._progress >= 100 && (this._clearTimer(), this._triggerBreathModal(), (t = this._actionEventContext) == null || t.dispatchEvent(new CustomEvent("mindscape-break")));
    }, 1e3);
  }
  _clearTimer() {
    this._progress = 0, clearInterval(this._timer);
  }
  _updateProgress() {
    const t = (/* @__PURE__ */ new Date()).getTime() - this._lastBreak.getTime();
    this._progress = Math.min(t / this._breakInterval * 100, 100);
  }
  render() {
    return w`
			<button @click=${y(this, d, g)}>
        <svg id="progress-bar" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" class="${this._progress >= 100 ? "pulse" : ""}">
          <circle id="bg" cx="50%" cy="50%" r="18.5" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="1.5"></circle>
          <circle id="progress" cx="50%" cy="50%" r="18.5" fill="none" stroke="currentColor" stroke-width="1.5" style="transform-origin: 50% 50%; rotate: 90deg; stroke-dasharray: ${this._progress / 100 * 115}, 115; stroke-linecap: round; transition: stroke-dasharray 120ms;"></circle>
        </svg>
        <svg id="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
			</button>
		`;
  }
};
i = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakSet();
g = function() {
  this._triggerSettingsModal();
};
o.styles = [
  f`
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
m([
  u()
], o.prototype, "_progress", 2);
o = m([
  k("mindscape-header-app")
], o);
const H = o;
export {
  o as HeaderAppElement,
  H as default
};
//# sourceMappingURL=headerapp.element-RaQN3WxF.js.map
