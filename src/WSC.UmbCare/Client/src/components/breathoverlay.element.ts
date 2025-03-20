import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { customElement, LitElement } from "@umbraco-cms/backoffice/external/lit";

@customElement('mindscape-breath-overlay')
export class BreathOverlayElement extends UmbElementMixin(LitElement) {

}

export default BreathOverlayElement;

declare global {
  interface HTMLElementTagNameMap {
    'mindscape-breath-overlay': BreathOverlayElement;
  }
}
