export interface Game {
    id: number;
    name: string;
    slug: string;
    background_image: string | null;
    released: string | null;
    rating: number;
  }
  export interface GamesResponse {
    results: Game[];
    next: string | null;
  }
  
  