export interface AnimeGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeImages {
  jpg: {
    image_url: string;
    large_image_url: string;
  };
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
  images: AnimeImages;
  genres?: AnimeGenre[];

  userStatus?: 'Pendiente' | 'Viendo' | 'Terminado';
  userNote?: string;
}
