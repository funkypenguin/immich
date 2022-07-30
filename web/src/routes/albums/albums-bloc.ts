import { goto } from '$app/navigation';
import { AlbumResponseDto, api } from '@api';

type AlbumsBlocParams = {
	albums: AlbumResponseDto[];
};

export class AlbumsBloc {
	albums: AlbumResponseDto[] = [];
	// context menu
	private _targetAlbum?: AlbumResponseDto;
	contextMenuPosition = { x: 0, y: 0 };
	isShowContextMenu = false;

	constructor({ albums }: AlbumsBlocParams) {
		this.albums = albums;
	}

	private async _autoDeleteAlbum(album: AlbumResponseDto) {
		try {
			await api.albumApi.deleteAlbum(album.id);
			return true;
		} catch (e) {
			console.log('Error [autoDeleteAlbum] ', e);
			return false;
		}
	}

	async init(): Promise<void> {
		const { data } = await api.albumApi.getAllAlbums();
		this.albums = data;

		// Delete album that has no photos and is named 'Untitled'
		for (const album of this.albums) {
			if (album.albumName === 'Untitled' && album.assets.length === 0) {
				const isDeleted = await this._autoDeleteAlbum(album);

				if (isDeleted) {
					this.albums = this.albums.filter((a) => a.id !== album.id);
				}
			}
		}
	}

	async createAlbum() {
		try {
			const { data: newAlbum } = await api.albumApi.createAlbum({
				albumName: 'Untitled'
			});

			goto('/albums/' + newAlbum.id);
		} catch (e) {
			console.log('Error [createAlbum] ', e);
		}
	}

	async deleteSelectedAlbum(): Promise<void> {
		if (!this._targetAlbum) {
			return;
		}
		if (
			window.confirm(
				`Are you sure you want to delete album ${this._targetAlbum.albumName}?` +
					' If the album is shared, other users will not be able to access it.'
			)
		) {
			const targetAlbumId = this._targetAlbum.id;
			try {
				await api.albumApi.deleteAlbum(this._targetAlbum.id);
				this.albums = this.albums.filter((a) => a.id !== targetAlbumId);
			} catch (e) {
				console.log('Error [userDeleteMenu] ', e);
			}
		}

		this.isShowContextMenu = false;
	}

	showAlbumContextMenu(event: CustomEvent, album: AlbumResponseDto) {
		this._targetAlbum = album;

		this.contextMenuPosition = {
			x: event.detail.x,
			y: event.detail.y
		};

		this.isShowContextMenu = !this.isShowContextMenu;
	}
}
