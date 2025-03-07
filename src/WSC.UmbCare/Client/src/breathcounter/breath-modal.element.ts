import { customElement, html} from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement, UmbModalRejectReason } from "@umbraco-cms/backoffice/modal";
import { MyModalData, MyModalValue } from "./breathing-countdown-modal.token";
import "./breathing-countdown";

@customElement('breath-modal')
export class breathModel extends UmbModalBaseElement<MyModalData, MyModalValue>{

  constructor() {
    super();
  }

  private handleClose() {
    this.modalContext?.reject({ type: "close" } as UmbModalRejectReason);
  }

  render() {
    return html`
    <umb-body-layout headline="Relax">

        <my-typescript-element></my-typescript-element>

<div slot="actions">
  <uui-button look="primary" color="positive" id="closeModal" @click="${this.handleClose}">Close</uui-button>
</div>
      </umb-body-layout>
         `;
  }
  
}
export default breathModel;
