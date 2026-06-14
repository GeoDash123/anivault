import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimeService } from '../../../core/services/anime.service';
import { AnimeCard } from '../../../shared/components/anime-card/anime-card';

@Component({
  selector: 'app-top',
  imports: [CommonModule, AnimeCard],
  templateUrl: './top.html',
  styleUrl: './top.css',
})
export class Top implements OnInit {
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
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar los animes.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}