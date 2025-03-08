import { LitElement, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";


@customElement('bluescreen-element')

export default class BluescreenElement extends UmbElementMixin(LitElement) {
  private _isBluescreenOn = false;
  connectedCallback() {
    super.connectedCallback();

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


  render() {
    return html`
   <uui-button look="primary" color="positive" id="blueScreen" label="Open" @click="${this._triggerBluescreen}">
         ${this._isBluescreenOn ? 'Bluescreen On' : 'Bluescreen Off'}
   </uui-button>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'bluescreen-element': BluescreenElement;
  }
}
