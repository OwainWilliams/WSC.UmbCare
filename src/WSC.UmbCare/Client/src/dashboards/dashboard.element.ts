import { LitElement, html, customElement } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT, UmbModalManagerContext } from "@umbraco-cms/backoffice/modal";
import { BREATH_MODAL_TOKEN } from "../breathcounter/breathing-countdown-modal.token";


@customElement('example-dashboard')
export class ExampleDashboardElement extends UmbElementMixin(LitElement) {

  #modalManagerContext?: UmbModalManagerContext;

  constructor() {
    super();

    this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
      this.#modalManagerContext = instance;
    });
  }

  private _triggerModal = () => {
    this.#modalManagerContext?.open(this, BREATH_MODAL_TOKEN, {
      data: {
        headline: 'Relaxation time'
      }
    });
  }

  render() {
    return html`
  
  <uui-button look="primary" color="positive" id="openModal" label="Close" @click="${this._triggerModal}">Open modal</uui-button>

    `;
  }

}

export default ExampleDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    'example-dashboard': ExampleDashboardElement;
  }
}
