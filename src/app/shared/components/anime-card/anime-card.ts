import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-anime-card',
  imports: [CommonModule],
  templateUrl: './anime-card.html',
  styleUrl: './anime-card.css',
})
export class AnimeCard {
  @Input() anime: any;

  constructor(private favoritesService: FavoritesService) {}

  toggleFavorite(): void {
    if (!this.anime) return;

    if (this.isFavorite()) {
      this.favoritesService.removeFavorite(this.anime.mal_id);
    } else {
      this.favoritesService.addFavorite(this.anime);
    }
  }

  isFavorite(): boolean {
    if (!this.anime) return false;

    return this.favoritesService.isFavorite(this.anime.mal_id);
  }
}