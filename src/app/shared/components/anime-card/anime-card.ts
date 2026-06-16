import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FavoritesService } from '../../../core/services/favorites.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-anime-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './anime-card.html',
  styleUrl: './anime-card.css',
})
export class AnimeCard {
  @Input() anime: any;

  showLoginModal = false;

  constructor(
    private favoritesService: FavoritesService,
    public authService: AuthService,
    private router: Router
  ) {}

  toggleFavorite(event: Event): void {
    event.stopPropagation();

    if (!this.anime) return;

    if (!this.authService.loggedIn()) {
      this.showLoginModal = true;
      return;
    }

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

  closeLoginModal(): void {
    this.showLoginModal = false;
  }

  goToLogin(): void {
    this.showLoginModal = false;
    this.router.navigate(['/login']);
  }
}