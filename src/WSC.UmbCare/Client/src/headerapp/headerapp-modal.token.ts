import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export type HeaderAppModalData = {
  headline: string;
}

export type HeaderAppModalValue = {
  key: string;
}

export const HEADERAPP_MODAL_TOKEN = new UmbModalToken<
  HeaderAppModalData,
  HeaderAppModalValue
  >('headerapp-modal', {
  modal: {
    type: 'sidebar',
    size: 'small',
  }
});
