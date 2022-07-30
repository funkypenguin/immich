<script context="module" lang="ts">
	export const prerender = false;

	import PlusBoxOutline from 'svelte-material-icons/PlusBoxOutline.svelte';

	import NavigationBar from '$lib/components/shared-components/navigation-bar.svelte';
	import { ImmichUser } from '$lib/models/immich-user';
	import type { Load } from '@sveltejs/kit';
	import SideBar from '$lib/components/shared-components/side-bar/side-bar.svelte';
	import { AlbumResponseDto, api } from '@api';
	import { AlbumsBloc } from './albums-bloc';

	export const load: Load = async () => {
		try {
			const { data: user } = await api.userApi.getMyUserInfo();
			const { data: albums } = await api.albumApi.getAllAlbums();

			return {
				status: 200,
				props: {
					user: user,
					albums: albums
				}
			};
		} catch (e) {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}
	};
</script>

<script lang="ts">
	import AlbumCard from '$lib/components/album-page/album-card.svelte';
	import { onMount } from 'svelte';
	import ContextMenu from '$lib/components/shared-components/context-menu/context-menu.svelte';
	import MenuOption from '$lib/components/shared-components/context-menu/menu-option.svelte';
	import DeleteOutline from 'svelte-material-icons/DeleteOutline.svelte';

	export let user: ImmichUser;
	export let albums: AlbumResponseDto[];

	const bloc = new AlbumsBloc({ albums });

	onMount(() => bloc.init());
</script>

<svelte:head>
	<title>Albums - Immich</title>
</svelte:head>

<section>
	<NavigationBar {user} on:uploadClicked={() => {}} />
</section>

<section class="grid grid-cols-[250px_auto] relative pt-[72px] h-screen bg-immich-bg ">
	<SideBar />

	<!-- Main Section -->

	<section class="overflow-y-auto relative immich-scrollbar">
		<section id="album-content" class="relative pt-8 pl-4 mb-12 bg-immich-bg">
			<div class="px-4 flex justify-between place-items-center">
				<div>
					<p class="font-medium">Albums</p>
				</div>

				<div>
					<button on:click={() => bloc.createAlbum()} class="immich-text-button text-sm">
						<span>
							<PlusBoxOutline size="18" />
						</span>
						<p>Create album</p>
					</button>
				</div>
			</div>

			<div class="my-4">
				<hr />
			</div>

			<!-- Album Card -->
			<div class="flex flex-wrap gap-8">
				{#each albums as album}
					{#key album.id}
						<a sveltekit:prefetch href={`albums/${album.id}`}>
							<AlbumCard {album} on:showalbumcontextmenu={(e) => bloc.showAlbumContextMenu(e, album)} />
						</a>
					{/key}
				{/each}
			</div>

			<!-- Empty Message -->
			{#if albums.length === 0}
				<div
					class="border p-5 w-[50%] m-auto mt-10 bg-gray-50 rounded-3xl flex flex-col place-content-center place-items-center"
				>
					<img src="/empty-1.svg" alt="Empty shared album" width="500" />

					<p class="text-center text-immich-text-gray-500">
						Create an album to organize your photos and videos
					</p>
				</div>
			{/if}
		</section>
	</section>

	<!-- Context Menu -->
	{#if bloc.isShowContextMenu}
		<ContextMenu {...bloc.contextMenuPosition} on:clickoutside={() => (bloc.isShowContextMenu = false)}>
			<MenuOption on:click={() => bloc.deleteSelectedAlbum()}>
				<span class="flex place-items-center place-content-center gap-2">
					<DeleteOutline size="18" />
					<p>Delete album</p>
				</span>
			</MenuOption>
		</ContextMenu>
	{/if}
</section>
