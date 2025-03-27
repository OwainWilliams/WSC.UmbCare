import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { MyModalData, MyModalValue } from "../headerapp/headerapp-modal.token";
import "./headerapp";

@customElement('headerapp-modal')
export class headerappModal extends UmbModalBaseElement<MyModalData, MyModalValue>{

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
   <headerapp-element></headerapp-element>

    `;
  }

}
export default headerappModal;
