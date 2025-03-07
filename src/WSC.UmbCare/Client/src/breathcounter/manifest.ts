import { ManifestModal } from "@umbraco-cms/backoffice/modal";

const breathModal: ManifestModal = {
  type: 'modal',
  alias: 'breath-modal',
  name: 'Breath Modal',
  js: () => import('./breath-modal.element.ts')
}
export const manifest = [ breathModal ];
