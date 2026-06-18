import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'aniVaultFavorites';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getFavorites(): any[] {
    if (!this.isBrowser()) {
      return [];
    }

    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addFavorite(anime: any): void {
    if (!this.isBrowser()) return;

    const favorites = this.getFavorites();
    const exists = favorites.some(item => item.mal_id === anime.mal_id);

    if (!exists) {
      const favoriteAnime = {
        ...anime,
        userStatus: 'Pendiente',
        userNote: ''
      };

      favorites.push(favoriteAnime);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(animeId: number): void {
    if (!this.isBrowser()) {
      return;
    }

    const favorites = this.getFavorites();

    const updatedFavorites = favorites.filter(
      item => item.mal_id !== animeId
    );

    localStorage.setItem(this.storageKey, JSON.stringify(updatedFavorites));
  }

  updateFavorite(animeId: number, changes: any): void {
    if (!this.isBrowser()) return;

    const favorites = this.getFavorites();

    const updatedFavorites = favorites.map(anime => {
      if (anime.mal_id === animeId) {
        return {
          ...anime,
          ...changes
        };
      }

      return anime;
    });

    localStorage.setItem(this.storageKey, JSON.stringify(updatedFavorites));
  }

  isFavorite(animeId: number): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    return this.getFavorites().some(
      item => item.mal_id === animeId
    );
  }
}