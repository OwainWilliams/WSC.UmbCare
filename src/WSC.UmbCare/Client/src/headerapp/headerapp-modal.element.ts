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

  override render() {
    return html`
    <umb-body-layout headline="It's a modal, but not as you know it!">
				<uui-box>
        <uui-toggle pristine="" label="Disable Countdown"></uui-toggle>
        <br />
        <uui-toggle pristine="" label="Blue light filter"></uui-toggle>
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
