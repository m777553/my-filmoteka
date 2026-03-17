import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MoviesService {
  // MOVIES: Movie[] = [];
  // nextId: number = 1;

  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    // this.prisma.movie - это доступ к таблице Movie
    return this.prisma.movie.create({
      data: {
        title: createMovieDto.title,
        year: createMovieDto.year,
        director: createMovieDto.director,
        description: createMovieDto.description,
        // Остальные поля (rating, isWatched) возьмутся по дефолту или null
      },
    });
  }

  async findAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany();
  }

  async findOne(id: number): Promise<Movie | null> {
    const movie = await this.prisma.movie.findUnique({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.prisma.movie.update({ where: { id }, data: updateMovieDto });
  }

  async remove(id: number) {
    await this.prisma.movie.delete({ where: { id } });
  }
}
