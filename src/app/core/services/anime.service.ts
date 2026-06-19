import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anime } from '../models/anime.model';
import { AnimeResponse } from '../interfaces/anime-response.interface';

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

  getTopAnime(limit: number = 10): Observable<AnimeResponse> {
    return this.http.get<AnimeResponse>(`${this.apiUrl}/top/anime?limit=${limit}`);
  }

  getAnimeById(id: number): Observable< { data: Anime }> {
    return this.http.get< { data: Anime } >(
      `${this.apiUrl}/anime/${id}/full`
    );
  }

  getSeasonNow(): Observable<AnimeResponse> {
    return this.http.get<AnimeResponse>(
      `${this.apiUrl}/seasons/now?limit=12&sfw=true`
    );
  }
  getTrendingAnime(): Observable<AnimeResponse> {
    return this.http.get<AnimeResponse>(`${this.apiUrl}/top/anime?limit=3`);
  }
}