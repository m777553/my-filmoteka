import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    // this.prisma.movie - это доступ к таблице Movie
    return this.prisma.movie.create({
      data: {
        title: createMovieDto.title,
        year: createMovieDto.year,
        director: createMovieDto.director,
        description: createMovieDto.description,
        genres: {
          connect: createMovieDto.genreIds
            ? createMovieDto.genreIds?.map((id) => ({ id }))
            : undefined,
        },
        // Остальные поля (rating, isWatched) возьмутся по дефолту или null
      },
      include: { genres: true },
    });
  }

  async findAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany({ include: { genres: true } });
  }

  async findOne(id: number): Promise<Movie | null> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: { genres: true },
    });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const { genreIds, ...movieData } = updateMovieDto;
    return this.prisma.movie.update({
      where: { id },
      data: {
        ...movieData,
        genres: genreIds ? { set: genreIds.map((id) => ({ id })) } : undefined,
      },
      include: { genres: true },
    });
  }

  async remove(id: number) {
    await this.prisma.movie.delete({ where: { id } });
  }
}
