import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export type MyModalData = {
  headline: string;
  disableForSeconds: number;
}

export type MyModalValue = {
  myData: string;
}

export const BREATH_MODAL_TOKEN = new UmbModalToken<MyModalData, MyModalValue>('breath-modal', {
  modal: {
    type: 'dialog'
  }
});
