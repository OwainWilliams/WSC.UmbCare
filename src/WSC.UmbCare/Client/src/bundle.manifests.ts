import { manifests as entrypoints } from './entrypoints/manifest';
import { manifests as dashboards } from './dashboards/manifest';
import { manifest as modals } from './breathcounter/manifest';
import { manifest as headerappModals } from './headerapp/manifest';
import { manifests as components } from './components/manifest';

// Job of the bundle is to collate all the manifests from different parts of the extension and load other manifests
// We load this bundle from umbraco-package.json
export const manifests: Array<UmbExtensionManifest> = [
  ...entrypoints,
  ...dashboards,
  ...modals,
  ...headerappModals,
  ...components
];
