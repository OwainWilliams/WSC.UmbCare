import { LitElement, html, customElement, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { startBreathingAnimation } from '../scripts/breathing-animation';

@customElement('my-typescript-element')

export default class MyTypeScriptElement extends UmbElementMixin(LitElement) {

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => startBreathingAnimation(this.shadowRoot!), 4000);
  }

  render() {
    return html`
            <div class="countdown">It's time to breathe</div>
                  <div class="container">
                <div class="breath-box">
                <div class="box-countdown">4</div>
              </div>
        <div class="ball"></div>
    </div>
    <div class="breath-text">Inhale</div>
        `;
  }

  static styles = [
    css`
            :host {
                display: grid;
                gap: var(--uui-size-layout-1);
                padding: var(--uui-size-layout-1);
                grid-template-columns: 1fr 1fr 1fr;
            }

            uui-box {
                margin-bottom: var(--uui-size-layout-1);
            }

            h2 {
                margin-top:0;
            }

            .wide {
                grid-column: span 3;
            }

             .modal {
                display: block;
                position: fixed;
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgb(0,0,0);
                background-color: rgba(0,0,0,0.4);
            }

            .modal-content {
                background-color: #fefefe;
                margin: 15% auto;
                padding: 20px;
                border: 1px solid #888;
                width: 40%;
            }

            .close {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
            }

            .close:hover,
            .close:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }

                    .container {
            position: relative;
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
        }

         .breath-box {
            width: 100px;
            height: 100px;
            background-color: lightblue;
            border-radius: 10px;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5em;
            color: darkblue;
        }

        .ball {
            width: 20px;
            height: 20px;
            background-color: darkblue;
            border-radius: 50%;
            position: absolute;
            animation: roll 16s infinite;
            animation-play-state: paused;
        }


        @keyframes roll {
            0% {
                top: 0;
                left: 0;
            }
            25% {
                top: 0;
                left: 80px;
            }
            50% {
                top: 80px;
                left: 80px;
            }
            75% {
                top: 80px;
                left: 0;
            }
            100% {
                top: 0;
                left: 0;
            }
        }

        .breath-text {
            font-size: 1.2em;
            color: darkblue;
        }

        .countdown {
            font-size: 2em;
            color: darkblue;
            margin-bottom: 20px;
        }

    `];
}

declare global {
  interface HTMLElementTagNameMap {
    'my-typescript-element': MyTypeScriptElement;
  }
}
