import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  movies: Movie[] = [];
  nextId: number = 1;

  create(createMovieDto: CreateMovieDto): Movie {
    const movie: Movie = {
      ...createMovieDto,
      createdAt: new Date(),
      notes: null,
      rating: null,
      id: this.nextId++,
      isWatched: false, // По дефолту не просмотрено
    };
    this.movies.push(movie);
    return movie;
  }

  findAll(): Movie[] {
    return this.movies;
  }

  findOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  update(id: number, updateMovieDto: UpdateMovieDto): Movie {
    const movie = this.findOne(id);
    Object.assign(movie, updateMovieDto);
    return movie;
  }

  remove(id: number) {
    this.findOne(id);
    this.movies = this.movies.filter((m) => m.id !== id);
  }
}
