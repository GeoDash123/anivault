import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimeService } from '../../../core/services/anime.service';
import { AnimeCard } from '../../../shared/components/anime-card/anime-card';
import { FormsModule } from '@angular/forms';
import { Loading } from '../../../shared/components/loading/loading';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { Anime } from '../../../core/models/anime.model';
import { AnimeResponse } from '../../../core/interfaces/anime-response.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AnimeCard, FormsModule, Loading, ErrorMessage],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  allAnimes: Anime[] = [];
  animes: Anime[] = [];
  trendingAnimes: Anime[] = [];

  searchText = '';

  selectedType = '';
  selectedStatus = '';
  selectedOrder = 'popularidad';
  selectedGenre = '';

  loading = false;
  error = '';

  constructor(
    private animeService: AnimeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTopAnime();
    this.loadTrendingAnime();
  }

  loadTopAnime(): void {
    this.loading = true;
    this.error = '';

    this.animeService.getTopAnime().subscribe({
      next: (response: AnimeResponse) => {
        this.allAnimes = response.data || [];
        this.applyFilters();

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.error = 'No se pudo cargar la información de anime.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadTrendingAnime(): void {
    this.animeService.getTrendingAnime().subscribe({
      next: (response: AnimeResponse) => {
        this.trendingAnimes = response.data || [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar tendencias:', error);
        this.trendingAnimes = [];
        this.cdr.detectChanges();
      }
    });
  }

  searchAnime(): void {
    if (!this.searchText.trim()) {
      this.loadTopAnime();
      return;
    }

    this.loading = true;
    this.error = '';

    this.animeService.searchAnime(this.searchText).subscribe({
      next: (response: AnimeResponse) => {
        this.allAnimes = response.data || [];
        this.applyFilters();

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al buscar anime:', error);

        if (error.status === 504) {
          this.error = 'La API tardó demasiado en responder. Intenta buscar de nuevo en unos segundos.';
        } else if (error.status === 429) {
          this.error = 'Se hicieron demasiadas peticiones. Espera un momento e intenta otra vez.';
        } else {
          this.error = 'No se pudo realizar la búsqueda. Intenta nuevamente.';
        }

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    let filteredAnimes = [...this.allAnimes];

    if (this.selectedType) {
      filteredAnimes = filteredAnimes.filter(anime =>
        anime.type?.toLowerCase() === this.selectedType
      );
    }

    if (this.selectedStatus) {
      filteredAnimes = filteredAnimes.filter(anime =>
        anime.status?.toLowerCase().includes(this.selectedStatus)
      );
    }

      if (this.selectedGenre) {
        filteredAnimes = filteredAnimes.filter(anime =>
          anime.genres?.some((genre: any) =>
            genre.name?.toLowerCase() === this.selectedGenre
          )
        );
      }

    if (this.selectedOrder === 'puntuacion') {
      filteredAnimes.sort((a, b) => (b.score || 0) - (a.score || 0));
    }

    if (this.selectedOrder === 'titulo') {
      filteredAnimes.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (this.selectedOrder === 'episodios') {
      filteredAnimes.sort((a, b) => (b.episodes || 0) - (a.episodes || 0));
    }

    this.animes = filteredAnimes;
  }

  clearFilters(): void {
    this.selectedType = '';
    this.selectedStatus = '';
    this.selectedGenre = '';
    this.selectedOrder = 'popularidad';
    this.applyFilters();
  }
}