import { UmbHeaderAppButtonElement } from "@umbraco-cms/backoffice/components";
import { css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
/*import { WSCUmbCareService } from "../api";*/
import { UMB_ACTION_EVENT_CONTEXT, UmbActionEventContext } from "@umbraco-cms/backoffice/action";
import { UMB_MODAL_MANAGER_CONTEXT, UmbModalManagerContext } from "@umbraco-cms/backoffice/modal";
import { HEADERAPP_MODAL_TOKEN } from "../headerapp/headerapp-modal.token";
import { BREATH_MODAL_TOKEN } from "../breathcounter/breathing-countdown-modal.token";

@customElement('mindscape-header-app')
export class HeaderAppElement extends UmbHeaderAppButtonElement {

  private _actionEventContext: UmbActionEventContext | undefined;
  #modalManagerContext?: UmbModalManagerContext;
  
  @state()
  private _progress: number = 0;

  private _breakInterval: number = 60000; // 15 minutes in milliseconds (900000)

  private _timer: number | undefined;

  private _lastBreak = new Date(); 

  constructor() {
    super();
    this.consumeContext(UMB_ACTION_EVENT_CONTEXT, (actionEventContext) => {
      this._actionEventContext = actionEventContext;
      this._actionEventContext.addEventListener('mindscape-break-complete', () => {
        this._lastBreak = new Date();
      });
    }),
      this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
        this.#modalManagerContext = instance;
      });
  }

  private _triggerBreathModal = () => {
    this.#modalManagerContext?.open(this, BREATH_MODAL_TOKEN, {
      data: {
        headline: 'Relaxation time',
        disableForSeconds: 30000
      }
    });
  }

  private _triggerSettingsModal = () => {
    this.#modalManagerContext?.open(this, HEADERAPP_MODAL_TOKEN, {
      data: {
        headline: 'Settings',
      }
    });
  }

  public connectedCallback() {
    super.connectedCallback();
    this._initTimer();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();
  }

  private async _initTimer() {
    if (this._progress >= 100) {
      this._lastBreak = new Date();
      this._progress = 0;
    }
    this._startTimer();
  }

  private _startTimer() {
    this._timer = setInterval(() => {
      const prevProgress = this._progress;
      this._updateProgress();
      if (prevProgress < 100 && this._progress >= 100) {
        this._clearTimer();
        this._triggerBreathModal();
        this._actionEventContext?.dispatchEvent(new CustomEvent('mindscape-break'));
      
      }
    }, 1000);
  }

  // private _isDueBreak()
  // {
  //   if (!this._lastBreak) return false;
  //   const now = new Date();
  //   const diff = now.getTime() - this._lastBreak.getTime();
  //   return diff >= this._breakInterval;
  // }

  private _clearTimer() {
    clearInterval(this._timer);
    this._progress = 0;
  }

  
  private _updateProgress() {
    const now = new Date();
    const diff = now.getTime() - this._lastBreak!.getTime();
    this._progress = Math.min((diff / this._breakInterval) * 100, 100);
  }

  #onClick() {
    this._triggerSettingsModal();
  }

  override render() {
    return html`
			<button @click=${this.#onClick}>
        <svg id="progress-bar" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" class="${this._progress >= 100 ? 'pulse' : ''}">
          <circle id="bg" cx="50%" cy="50%" r="18.5" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="1.5"></circle>
          <circle id="progress" cx="50%" cy="50%" r="18.5" fill="none" stroke="currentColor" stroke-width="1.5" style="transform-origin: 50% 50%; rotate: 90deg; stroke-dasharray: ${this._progress / 100 * 115}, 115; stroke-linecap: round; transition: stroke-dasharray 120ms;"></circle>
        </svg>
        <svg id="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
			</button>
		`;
  }

  static override styles = [
    UmbHeaderAppButtonElement.styles,
    css`
      :host {
      }
      button {
        display: inline-block;
        position: relative;
        height: 34px;
        width: 34px;
        background-color: transparent;
        border: none;
        padding: 0;
        color: white;
        font-size: 14px;
        vertical-align: middle;
        cursor: pointer;
      }
      .pulse {
        transform: scale(1);
        animation: pulse 1.5s infinite;
      }
      svg#icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1.125em;
        height: 1.125em;
      }
      @keyframes pulse {
        0% {
          transform: scale(1);
        }

        50% {
          transform: scale(1.2);
        }

        100% {
          transform: scale(1);
        }
      }
    `
  ]

}

export default HeaderAppElement;

declare global {
  interface HTMLElementTagNameMap {
    'mindscape-header-app': HeaderAppElement;
  }
}
