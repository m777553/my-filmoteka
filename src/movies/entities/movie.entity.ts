// Это то, как фильм выглядит "внутри".
export class Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  description: string | null;
  rating: number | null; // (null = ещё не оценён)
  isWatched: boolean;
  notes: string | null; // (личная заметка)
  createdAt: Date;
}
