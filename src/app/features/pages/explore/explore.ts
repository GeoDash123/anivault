import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimeService } from '../../../core/services/anime.service';
import { AnimeCard } from '../../../shared/components/anime-card/anime-card'
import { FormsModule } from '@angular/forms';
import { Loading } from '../../../shared/components/loading/loading';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-explore',
  imports: [CommonModule, AnimeCard, FormsModule, Loading, ErrorMessage],
  templateUrl: './explore.html',
  styleUrl: './explore.css',
})
export class Explore implements OnInit {
  animes: any[] = [];
  loading = false;
  error = '';

  constructor(
    private animeService: AnimeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTopAnime();
  }

  loadTopAnime(): void {
    this.loading = true;
    this.error = '';

    this.animeService.getTopAnime().subscribe({
      next: (response: any) => {
        this.animes = response.data;
        this.loading = false;

        console.log('Animes cargados:', this.animes);

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

  searchText = '';

  searchAnime(): void {
    if (!this.searchText.trim()) {
      this.loadTopAnime();
      return;
    }

    this.loading = true;
    this.error = '';

    this.animeService.searchAnime(this.searchText).subscribe({
      next: (response: any) => {
        this.animes = response.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo realizar la búsqueda.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}