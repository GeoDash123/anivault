import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnimeService } from '../../../core/services/anime.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-anime-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './anime-detail.html',
  styleUrl: './anime-detail.css',
})
export class AnimeDetail implements OnInit {
  anime: any = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error = 'Anime no encontrado.';
      return;
    }

    this.loadAnime(id);
  }

  loadAnime(id: number): void {
    this.loading = true;
    this.error = '';

    this.animeService.getAnimeById(id).subscribe({
      next: (response: any) => {
        this.anime = response.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar el detalle del anime.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}