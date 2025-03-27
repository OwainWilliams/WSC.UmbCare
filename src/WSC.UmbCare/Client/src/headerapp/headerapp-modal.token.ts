import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export type MyModalData = {
  headline: string;
}

export type MyModalValue = {
  myData: string;
}

export const HEADERAPP_MODAL_TOKEN = new UmbModalToken<MyModalData, MyModalValue>('headerapp-modal', {
  modal: {
    type: 'sidebar'
  }
});
