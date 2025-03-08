import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement, UmbModalRejectReason } from "@umbraco-cms/backoffice/modal";
import { MyModalData, MyModalValue } from "./breathing-countdown-modal.token";
import "./breathing-countdown";

@customElement('breath-modal')
export class breathModal extends UmbModalBaseElement<MyModalData, MyModalValue>{

  constructor() {
    super();
  }

  private handleClose() {
    this.modalContext?.reject({ type: "close" } as UmbModalRejectReason);
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      const modalButton = this.shadowRoot?.getElementById('closeModal') as HTMLButtonElement;
      if (modalButton) {
        modalButton.disabled = false;
      }
    }, this.data?.disableForSeconds);
  }

  render() {
    return html`
    <umb-body-layout headline="${this.data?.headline}">
    <breath-square-element></breath-square-element>

    <div slot="actions">
        <uui-button look="primary" color="positive" id="closeModal" @click="${this.handleClose}" disabled="true">Close</uui-button>
    </div>

    </umb-body-layout>
    `;
  }

}
export default breathModal;
