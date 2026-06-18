import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimeCard } from '../../../shared/components/anime-card/anime-card';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, FormsModule, AnimeCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  favorites: any[] = [];
  successMessage = '';
  animeToDelete: any = null;
  showDeleteModal = false;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favorites = this.favoritesService.getFavorites().map(anime => ({
      ...anime,
      userStatus: anime.userStatus || 'Pendiente',
      userNote: anime.userNote || ''
    }));
  }

  updateFavorite(anime: any): void {
    this.favoritesService.updateFavorite(anime.mal_id, {
      userStatus: anime.userStatus,
      userNote: anime.userNote
    });

    this.successMessage = `Se actualizaron los datos de ${anime.title}.`;

    setTimeout(() => {
      this.successMessage = '';
    }, 2500);
  }

  removeFavorite(animeId: number): void {
    this.favoritesService.removeFavorite(animeId);
    this.loadFavorites();
  }

  openDeleteModal(anime: any): void {
  this.animeToDelete = anime;
  this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.animeToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (!this.animeToDelete) return;

    this.favoritesService.removeFavorite(this.animeToDelete.mal_id);

    this.successMessage = `Se eliminó ${this.animeToDelete.title} de favoritos.`;

    this.animeToDelete = null;
    this.showDeleteModal = false;

    this.loadFavorites();

    setTimeout(() => {
      this.successMessage = '';
    }, 2500);
  }

}