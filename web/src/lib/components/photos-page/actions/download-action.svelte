<script lang="ts">
  import { shortcut } from '$lib/actions/shortcut';

  import { authManager } from '$lib/managers/auth-manager.svelte';
  import { downloadArchive, downloadFile } from '$lib/utils/asset-utils';
  import { getAssetInfo } from '@immich/sdk';
  import { IconButton } from '@immich/ui';
  import { mdiCloudDownloadOutline, mdiFileDownloadOutline, mdiFolderDownloadOutline } from '@mdi/js';
  import { t } from 'svelte-i18n';
  import MenuOption from '../../shared-components/context-menu/menu-option.svelte';
  import { getAssetControlContext } from '../asset-select-control-bar.svelte';

  interface Props {
    filename?: string;
    menuItem?: boolean;
  }

  let { filename = 'immich.zip', menuItem = false }: Props = $props();

  const { getAssets, clearSelect } = getAssetControlContext();

  const handleDownloadFiles = async () => {
    const assets = [...getAssets()];
    if (assets.length === 1) {
      clearSelect();
      let asset = await getAssetInfo({ ...authManager.params, id: assets[0].id });
      await downloadFile(asset);
      return;
    }

    clearSelect();
    await downloadArchive(filename, { assetIds: assets.map((asset) => asset.id) });
  };

  let menuItemIcon = $derived(getAssets().length === 1 ? mdiFileDownloadOutline : mdiFolderDownloadOutline);
</script>

<svelte:document use:shortcut={{ shortcut: { key: 'd', shift: true }, onShortcut: handleDownloadFiles }} />

{#if menuItem}
  <MenuOption text={$t('download')} icon={menuItemIcon} onClick={handleDownloadFiles} />
{:else}
  <IconButton
    shape="round"
    color="secondary"
    variant="ghost"
    aria-label={$t('download')}
    icon={mdiCloudDownloadOutline}
    onclick={handleDownloadFiles}
  />
{/if}
