import { CommonModule } from '@angular/common';
import { Component, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  errorImage = '';

  private readonly errorImages = [
    'https://http.cat/404',
    'https://httpmemes.com/404.jpg',
    'https://http.dog/404.jpg',
    'https://httpcats.com/404.jpg'
  ];

  constructor() {
    afterNextRender(() => {
      const randomIndex = Math.floor(Math.random() * this.errorImages.length);
      this.errorImage = this.errorImages[randomIndex];
    });
  }
}