import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AnimeResponse {
  data: Anime[];
}

export interface Anime {
  mal_id: number;
  title: string;
  title_japanese?: string;
  synopsis?: string;
  score?: number;
  episodes?: number;
  status?: string;
  type?: string;
  year?: number;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private apiUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) {}

  searchAnime(query: string): Observable<AnimeResponse> {
    return this.http.get<AnimeResponse>(
      `${this.apiUrl}/anime?q=${encodeURIComponent(query)}&limit=12&sfw=true`
    );
  }

  getTopAnime(limit: number = 10) {
    return this.http.get(`${this.apiUrl}/top/anime?limit=${limit}`);
  }

  getAnimeById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/anime/${id}/full`
    );
  }

  getSeasonNow(): Observable<AnimeResponse> {
    return this.http.get<AnimeResponse>(
      `${this.apiUrl}/seasons/now?limit=12&sfw=true`
    );
  }
}