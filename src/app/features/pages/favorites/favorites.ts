import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimeCard } from '../../../shared/components/anime-card/anime-card';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, AnimeCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  favorites: any[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favorites = this.favoritesService.getFavorites();
  }
}