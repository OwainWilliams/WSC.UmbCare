import { LitElement, html, customElement, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

@customElement('headerapp-element')

export default class HeaderAppElement extends UmbElementMixin(LitElement) {

  render() {
    return html`
    <div class="container">
      <h1>test</h1>
    </div>
        `;
  }

  static styles = [
    css`
            .container {
            position: relative;
            width: 300px;
            height: 100px;
            margin-bottom: 20px;
        }
    `];
}

declare global {
  interface HTMLElementTagNameMap {
    'headerapp-element': HeaderAppElement;
  }
}
