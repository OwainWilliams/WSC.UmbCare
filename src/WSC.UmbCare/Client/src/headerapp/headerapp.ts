import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement} from "@umbraco-cms/backoffice/modal";
import { HeaderAppModalData, HeaderAppModalValue } from "./headerapp-modal.token.ts";

@customElement('headerapp-element')

export class HeaderAppModal
  extends UmbModalBaseElement<HeaderAppModalData, HeaderAppModalValue>{

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
        Something here
        </uui-box>
        	<div slot="actions">
            <uui-button id="close" label="Close" @click="${this._rejectModal}">Close</uui-button>
				</div>
      </umb-body-layout>
        `;
  }
}

export default HeaderAppModal;

declare global {
  interface HTMLElementTagNameMap {
    'headerapp-element': HeaderAppModal;
  }
}
