import { LitElement, css, html, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { WSCUmbCareService, UserModel } from "../api";
import { UUIButtonElement } from "@umbraco-cms/backoffice/external/uui";
import { UMB_NOTIFICATION_CONTEXT, UmbNotificationContext } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT, UmbCurrentUserModel } from "@umbraco-cms/backoffice/current-user";
import { startBreathingAnimation } from '../scripts/breathing-animation';

@customElement('example-dashboard')
export class ExampleDashboardElement extends UmbElementMixin(LitElement) {

  @state()
  private _yourName: string | undefined = "Press the button!";

  @state()
  private _timeFromMrWolf: Date | undefined;

  @state()
  private _serverUserData: UserModel | undefined = undefined;

  @state()
  private _contextCurrentUser: UmbCurrentUserModel | undefined = undefined;

  @state()
  private _showModal: boolean = false;


  constructor() {
    super();

    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (notificationContext) => {
      this.#notificationContext = notificationContext;
    });

    this.consumeContext(UMB_CURRENT_USER_CONTEXT, (currentUserContext) => {

      // When we have the current user context
      // We can observe properties from it, such as the current user or perhaps just individual properties
      // When the currentUser object changes we will get notified and can reset the @state properrty
      this.observe(currentUserContext.currentUser, (currentUser) => {
        this._contextCurrentUser = currentUser;
      });
    });  
  }



  #notificationContext: UmbNotificationContext | undefined = undefined;

  #onClickWhoAmI = async (ev: Event) => {
    const buttonElement = ev.target as UUIButtonElement;
    buttonElement.state = "waiting";

    const { data, error } = await WSCUmbCareService.whoAmI();

    if (error) {
      buttonElement.state = "failed";
      console.error(error);
      return;
    }

    if (data !== undefined) {
      this._serverUserData = data;
      buttonElement.state = "success";
    }

    if (this.#notificationContext) {
      this.#notificationContext.peek("warning", {
        data: {
          headline: `You are ${this._serverUserData?.name}`,
          message: `Your email is ${this._serverUserData?.email}`,
        }
      })
    }
  }

  #onClickWhatsTheTimeMrWolf = async (ev: Event) => {
    const buttonElement = ev.target as UUIButtonElement;
    buttonElement.state = "waiting";

    // Getting a string - should I expect a datetime?!
    const { data, error } = await WSCUmbCareService.whatsTheTimeMrWolf();

    if (error) {
      buttonElement.state = "failed";
      console.error(error);
      return;
    }

    if (data !== undefined) {
      this._timeFromMrWolf = new Date(data);
      buttonElement.state = "success";
    }
  }

  #onClickWhatsMyName = async (ev: Event) => {
    const buttonElement = ev.target as UUIButtonElement;
    buttonElement.state = "waiting";
    this._showModal = true;

    setTimeout(() => startBreathingAnimation(this.shadowRoot!), 1);
    
    const { data, error } = await WSCUmbCareService.whatsMyName();

    if (error) {
      buttonElement.state = "failed";
      console.error(error);
      return;
    }

    this._yourName = data;
    buttonElement.state = "success";
  }

  render() {
    return html`
        <uui-box headline="Who am I?">
            <div slot="header">[Server]</div>
            <h2><uui-icon name="icon-user"></uui-icon>${this._serverUserData?.email ? this._serverUserData.email : 'Press the button!'}</h2>
            <ul>
                ${this._serverUserData?.groups.map(group => html`<li>${group.name}</li>`)}
            </ul>
            <uui-button color="default" look="primary" @click="${this.#onClickWhoAmI}">
                Who am I?
            </uui-button>
            <p>This endpoint gets your current user from the server and displays your email and list of user groups.
            It also displays a Notification with your details.</p>
        </uui-box>

        <uui-box headline="What's my Name?">
            <div slot="header">[Server]</div>
            <h2><uui-icon name="icon-user"></uui-icon> ${this._yourName}</h2>
            <uui-button color="default" look="primary" @click="${this.#onClickWhatsMyName}">
                Whats my name?
            </uui-button>
            <p>This endpoint has a forced delay to show the button 'waiting' state for a few seconds before completing the request.</p>
        </uui-box>

        <uui-box headline="What's the Time?">
            <div slot="header">[Server]</div>
            <h2><uui-icon name="icon-alarm-clock"></uui-icon> ${this._timeFromMrWolf ? this._timeFromMrWolf.toLocaleString() : 'Press the button!'}</h2>
            <uui-button color="default" look="primary" @click="${this.#onClickWhatsTheTimeMrWolf}">
                Whats the time Mr Wolf?
            </uui-button>
            <p>This endpoint gets the current date and time from the server.</p>
        </uui-box>

        <uui-box headline="Who am I?" class="wide">
          <div slot="header">[Context]</div>
          <p>Current user email: <b>${this._contextCurrentUser?.email}</b></p>
          <p>This is the JSON object available by consuming the 'UMB_CURRENT_USER_CONTEXT' context:</p>
          <umb-code-block language="json" copy>${JSON.stringify(this._contextCurrentUser, null, 2)}</umb-code-block>
        </uui-box>

        ${this._showModal ? html`
         <div class="modal">
  <div class="modal-content">
      <div class="countdown">It's time to breathe</div>
    <div class="container">
        <div class="breath-box">
            <div class="box-countdown">4</div>
        </div>
        <div class="ball"></div>
    </div>
    <div class="breath-text">Inhale</div>
  </div>
</div>

        ` : ''}
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

export default ExampleDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    'example-dashboard': ExampleDashboardElement;
  }
}
