import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { HeaderAppModalData, HeaderAppModalValue } from "../headerapp/headerapp-modal.token";

@customElement('headerapp-modal')
export class headerappModal extends UmbModalBaseElement<HeaderAppModalData, HeaderAppModalValue>{
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  private _isBluescreenOn = false;

  async #onSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!this.data) throw new Error('No data provided');

    const form = e.target as HTMLFormElement;

    if (!form.checkValidity()) return;

    const formData = new FormData(form);

    const disableCountdown = formData.get('disableCountdown') as string;
    const disableBreathing = formData.get('disableBreathing') as string;

    disableCountdown == "on" ? console.log("disable countdown") : console.log("enable countdown");

    if (disableBreathing == "on" || disableBreathing == null) {
      this._triggerBluescreen();
    }

    const code = formData.get('code') as string;

    if (!code) return;

  }

  private _triggerBluescreen = () => {
    console.log("bluescreen button");
    const body = document.body;
    if (this._isBluescreenOn) {
      body.style.filter = '';
      body.style.backgroundColor = '';
      body.style.color = '';
    } else {
      body.style.filter = 'hue-rotate(180deg)';
      body.style.backgroundColor = 'blue';
      body.style.color = 'white';
    }
    this._isBluescreenOn = !this._isBluescreenOn;
    this.requestUpdate();
  }



  override render() {
    return html`
    <umb-body-layout headline="It's a modal, but not as you know it!">
				<uui-box>
        <uui-form>
        <form id="umbCareSettingsForm" name="authForm" @submit=${this.#onSubmit} novalidate>
         <uui-form-layout-item>
            <uui-toggle pristine="" label="Disable Countdown" name="disableCountdown"></uui-toggle>
        </uui-form-layout-item>

        <uui-form-layout-item>
            <uui-toggle pristine="" label="Disable Breath Square" name="disableBreathing"></uui-toggle>
        </uui-form-layout-item>

         <uui-form-layout-item>
            <uui-toggle pristine="" label="Blue Screen" name="blueScreen"></uui-toggle>
        </uui-form-layout-item>

        <uui-form-layout-item>
            <uui-toggle pristine="" label="Hydration Time" name="hydration"></uui-toggle>
        </uui-form-layout-item>
         <uui-button type="submit" label="Submit" look="primary">
        Save
      </uui-button>
        </form>
        </<uui-form>
        </uui-box>

        	<div slot="actions">
            <uui-button id="close" label="Close" @click="${this._rejectModal}" look="secondary" color="default">Close</uui-button>
				</div>
      </umb-body-layout>
        `;
  }
}

export default headerappModal;

declare global {
  interface HTMLElementTagNameMap {
    'headerapp-model': headerappModal;
  }
}
