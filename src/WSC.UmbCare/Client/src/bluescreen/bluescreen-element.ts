import { LitElement, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";


@customElement('bluescreen-element')

export default class BluescreenElement extends UmbElementMixin(LitElement) {

  connectedCallback() {
    super.connectedCallback();

  }

  private _triggerBluescreen = () => {
    console.log("bluescreen button");
    const body = document.body;
    if (body.style.filter === 'hue-rotate(180deg)') {
      body.style.filter = '';
      body.style.backgroundColor = '';
      body.style.color = '';
    } else {
      body.style.filter = 'hue-rotate(180deg)';
      body.style.backgroundColor = 'blue';
      body.style.color = 'white';
    }
  }


  render() {
    return html`
   <uui-button look="primary" color="positive" id="blueScreen" label="Open" @click="${this._triggerBluescreen}">Bluescreen</uui-button>
    `;
  }

//  static styles = [
//    css`
//    body.blue-screen {
//      filter: hue-rotate(180deg);
//      background-color: blue;
//      color: white;
//}
//    `];
}

declare global {
  interface HTMLElementTagNameMap {
    'bluescreen-element': BluescreenElement;
  }
}
