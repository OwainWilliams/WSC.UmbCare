import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { HeaderAppModalData, HeaderAppModalValue } from "../headerapp/headerapp-modal.token";
import "./headerapp";

@customElement('headerapp-modal')
export class headerappModal extends UmbModalBaseElement<HeaderAppModalData, HeaderAppModalValue>{

 
  render() {
    return html`
   <headerapp-element></headerapp-element>

    `;
  }

}
export default headerappModal;
