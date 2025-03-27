import { ManifestModal } from "@umbraco-cms/backoffice/modal";

const headerappModal: ManifestModal = {
  type: 'modal',
  alias: 'headerapp-modal',
  name: 'Headerapp Modal',
  js: () => import('./headerapp-modal.element.ts')
}
export const manifest = [ headerappModal ];
