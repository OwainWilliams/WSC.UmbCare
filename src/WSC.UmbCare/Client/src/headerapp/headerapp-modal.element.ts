import { customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { HeaderAppModalData, HeaderAppModalValue } from "../headerapp/headerapp-modal.token";
import { umbHttpClient } from "@umbraco-cms/backoffice/http-client";

interface SettingsApiContext {
  getDisableCountdownSetting(): Promise<boolean>;
  setDisableCountdownSetting(disabled: boolean): Promise<void>;
}

@customElement('headerapp-modal')
export class headerappModal extends UmbModalBaseElement<HeaderAppModalData, HeaderAppModalValue>{

  @state()
  private _isDisableCountdownChecked = false;

  @state()
  private _isLoading = true;

  private _settingsApi: SettingsApiContext;

  constructor() {
    super();

    // Initialize the API context
    this._settingsApi = {
      getDisableCountdownSetting: async (): Promise<boolean> => {
        try {
          const response = await umbHttpClient.get({
            url: '/umbraco/wscumbcare/api/v1/settings/disable-countdown'
          });

          if (response.error) {
            console.error('API Error:', response.error);
            throw new Error('Failed to fetch setting');
          }

          // Your C# API returns a plain boolean value
          return response.data === true;
        } catch (error) {
          console.error('GET request failed:', error);
          throw error;
        }
      },

      setDisableCountdownSetting: async (disabled: boolean): Promise<void> => {
        try {

          console.log('Sending request body:', { Disabled: disabled }); // Debug log

          const response = await umbHttpClient.post({
            url: '/umbraco/wscumbcare/api/v1/settings/disable-countdown',
            body: JSON.stringify({ Disabled: disabled }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log('Response received:', response); // Debug log


          if (response.error) {
            console.error('API Error:', response.error);
            throw new Error('Failed to save setting');
          }
        } catch (error) {
          console.error('POST request failed:', error);
          throw error;
        }
      }
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._loadSettings();
  }

  private async _loadSettings() {
    try {
      this._isLoading = true;
      this._isDisableCountdownChecked = await this._settingsApi.getDisableCountdownSetting();
    } catch (error) {
      console.error('Failed to load settings:', error);
      // Set a default value on error
      this._isDisableCountdownChecked = false;
    } finally {
      this._isLoading = false;
    }
  }

  async #onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    console.log('Form submitted:', form.checkValidity());

    if (!form.checkValidity()) return;
    console.log('Form is valid, proceeding to save settings...', this._isDisableCountdownChecked);

    try {
      // Save the setting to the KeyValue table
      await this._settingsApi.setDisableCountdownSetting(this._isDisableCountdownChecked);

      console.log(this._isDisableCountdownChecked ? "Countdown disabled and saved" : "Countdown enabled and saved");

      // Close the modal after saving
      this._submitModal();

    } catch (error) {
      console.error('Failed to save setting:', error);
      // You could show an error notification here
    }
  }

  override render() {
    if (this._isLoading) {
      return html`
        <umb-body-layout headline="Loading settings...">
          <uui-box>
            <uui-loader></uui-loader>
          </uui-box>
          <div slot="actions">
            <uui-button id="close" label="Close" @click="${this._closeModel}" look="secondary" color="default">Close me</uui-button>
          </div>
        </umb-body-layout>
      `;
    }

    return html`
      <umb-body-layout headline="WSC UmbCare Settings">
        <uui-box>
          <uui-form>
            <form id="umbCareSettingsForm" name="settingsForm" @submit=${this.#onSubmit} novalidate>
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

  private _onToggleChange(e: Event) {
    const toggle = e.target as any;
    this._isDisableCountdownChecked = toggle.checked;

    // Dispatch event to notify header app about the toggle change
    window.dispatchEvent(new CustomEvent('countdown-toggle-changed', {
      detail: { disabled: this._isDisableCountdownChecked }
    }));
  }

  private _closeModel() {
    // Dispatch the event that headerapp.element.ts is listening for
    window.dispatchEvent(new CustomEvent('headerapp-modal-closed'));
    this._rejectModal();
  }

}


export default headerappModal;

declare global {
  interface HTMLElementTagNameMap {
    'headerapp-modal': headerappModal;
  }
}
