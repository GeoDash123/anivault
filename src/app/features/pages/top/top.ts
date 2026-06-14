import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnimeService } from '../../../core/services/anime.service';
import { Loading } from '../../../shared/components/loading/loading';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-top',
  imports: [CommonModule, FormsModule, RouterLink, Loading, ErrorMessage],
  templateUrl: './top.html',
  styleUrl: './top.css',
})
export class Top implements OnInit {
  animes: any[] = [];
  visibleCount = 10;

  searchText = '';
  loading = false;
  error = '';

  constructor(
    private animeService: AnimeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTopAnime();
  }

  get visibleAnimes(): any[] {
    return this.animes.slice(0, this.visibleCount);
  }

  get featuredAnime(): any | null {
    return this.animes.length > 0 ? this.animes[0] : null;
  }

  get trendingAnimes(): any[] {
    return this.animes.slice(5, 8);
  }

  loadTopAnime(): void {
    this.loading = true;
    this.error = '';

    this.animeService.getTopAnime(25).subscribe({
      next: (response: any) => {
        this.animes = response.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar el ranking de animes.';
        this.loading = false;
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
      next: (response: any) => {
        this.animes = response.data;
        this.visibleCount = 10;
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

  showMore(): void {
    this.visibleCount += 10;
  }
}