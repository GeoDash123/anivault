import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-anime-card',
  imports: [CommonModule],
  templateUrl: './anime-card.html',
  styleUrl: './anime-card.css',
})
export class AnimeCard {
  @Input() anime: any;
}