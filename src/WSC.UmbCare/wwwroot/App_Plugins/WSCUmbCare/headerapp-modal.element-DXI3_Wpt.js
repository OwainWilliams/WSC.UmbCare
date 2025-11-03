import { html as u, state as h, customElement as p } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as m } from "@umbraco-cms/backoffice/modal";
import { umbHttpClient as c } from "@umbraco-cms/backoffice/http-client";
var C = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, b = (e) => {
  throw TypeError(e);
}, d = (e, t, o, a) => {
  for (var s = a > 1 ? void 0 : a ? _(t, o) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (s = (a ? r(t, o, s) : r(s)) || s);
  return a && s && C(t, o, s), s;
}, w = (e, t, o) => t.has(e) || b("Cannot " + o), f = (e, t, o) => t.has(e) ? b("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), v = (e, t, o) => (w(e, t, "access private method"), o), l, g;
let i = class extends m {
  constructor() {
    super(), f(this, l), this._isDisableCountdownChecked = !1, this._isLoading = !0, this._settingsApi = {
      getDisableCountdownSetting: async () => {
        try {
          const e = await c.get({
            url: "/umbraco/wscumbcare/api/v1/settings/disable-countdown"
          });
          if (e.error)
            throw console.error("API Error:", e.error), new Error("Failed to fetch setting");
          return e.data === !0;
        } catch (e) {
          throw console.error("GET request failed:", e), e;
        }
      },
      setDisableCountdownSetting: async (e) => {
        try {
          console.log("Sending request body:", { Disabled: e });
          const t = await c.post({
            url: "/umbraco/wscumbcare/api/v1/settings/disable-countdown",
            body: JSON.stringify({ Disabled: e }),
            headers: {
              "Content-Type": "application/json"
            }
          });
          if (console.log("Response received:", t), t.error)
            throw console.error("API Error:", t.error), new Error("Failed to save setting");
        } catch (t) {
          throw console.error("POST request failed:", t), t;
        }
      }
    };
  }
  async connectedCallback() {
    super.connectedCallback(), await this._loadSettings();
  }
  async _loadSettings() {
    try {
      this._isLoading = !0, this._isDisableCountdownChecked = await this._settingsApi.getDisableCountdownSetting();
    } catch (e) {
      console.error("Failed to load settings:", e), this._isDisableCountdownChecked = !1;
    } finally {
      this._isLoading = !1;
    }
  }
  render() {
    return this._isLoading ? u`
        <umb-body-layout headline="Loading settings...">
          <uui-box>
            <uui-loader></uui-loader>
          </uui-box>
          <div slot="actions">
            <uui-button id="close" label="Close" @click="${this._closeModel}" look="secondary" color="default">Close me</uui-button>
          </div>
        </umb-body-layout>
      ` : u`
      <umb-body-layout headline="WSC UmbCare Settings">
        <uui-box>
          <uui-form>
            <form id="umbCareSettingsForm" name="settingsForm" @submit=${v(this, l, g)} novalidate>
              <uui-form-layout-item>Disable Countdown Feature
                <uui-toggle 
                  label="Disable Countdown" 
                  name="disableCountdown" 
                  ?checked=${this._isDisableCountdownChecked}
                  @change=${this._onToggleChange}>
                </uui-toggle>
              </uui-form-layout-item>

              <uui-button type="submit" label="Save" look="primary">
                Save Settings
              </uui-button>
            </form>
          </uui-form>
        </uui-box>

        <div slot="actions">
          <uui-button id="close" label="Close" @click="${this._closeModel}" look="secondary" color="default">Close</uui-button>
        </div>
      </umb-body-layout>
    `;
  }
  _onToggleChange(e) {
    const t = e.target;
    this._isDisableCountdownChecked = t.checked;
  }
  _closeModel() {
    window.dispatchEvent(new CustomEvent("headerapp-modal-closed")), this._rejectModal();
  }
};
l = /* @__PURE__ */ new WeakSet();
g = async function(e) {
  e.preventDefault();
  const t = e.target;
  if (console.log("Form submitted:", t.checkValidity()), !!t.checkValidity()) {
    console.log("Form is valid, proceeding to save settings...", this._isDisableCountdownChecked);
    try {
      await this._settingsApi.setDisableCountdownSetting(this._isDisableCountdownChecked), console.log(this._isDisableCountdownChecked ? "Countdown disabled and saved" : "Countdown enabled and saved"), this._submitModal();
    } catch (o) {
      console.error("Failed to save setting:", o);
    }
  }
};
d([
  h()
], i.prototype, "_isDisableCountdownChecked", 2);
d([
  h()
], i.prototype, "_isLoading", 2);
i = d([
  p("headerapp-modal")
], i);
const S = i;
export {
  S as default,
  i as headerappModal
};
//# sourceMappingURL=headerapp-modal.element-DXI3_Wpt.js.map
