import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { PrismaService } from '../prisma/prisma.service';
import { FilterMoviesDto } from './dto/filter-movies.dto';
import { Prisma } from '@prisma/client';
import { SortOrder } from '../../interfaces/sort.interface';

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

  async findAll(filter: FilterMoviesDto): Promise<{
    data: Movie[];
    meta: { total: number; page: number; lastPage: number };
  }> {
    const {
      search,
      genreId,
      isWatched,
      limit = 10,
      order = SortOrder.DESC,
      page = 1,
      ratingFrom,
      ratingTo,
      sortBy = 'year',
      yearFrom,
      yearTo,
    } = filter;

    // 1. Фильтрация (WHERE)
    const where: Prisma.MovieWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { director: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (genreId) {
      where.genres = { some: { id: genreId } };
    }

    if (isWatched !== undefined) {
      where.isWatched = isWatched;
    }

    if (ratingFrom !== undefined || ratingTo !== undefined) {
      where.rating = {};
      if (ratingFrom !== undefined) where.rating.gte = ratingFrom; // Добавляем от
      if (ratingTo !== undefined) where.rating.lte = ratingTo; // Добавляем до
    }

    if (yearFrom !== undefined || yearTo !== undefined) {
      where.year = {};
      if (yearFrom !== undefined) where.year.gte = yearFrom; // Добавляем от (>= 2000)
      if (yearTo !== undefined) where.year.lte = yearTo; // Добавляем до (<= 2015)
    }

    // 2. Пагинация
    const skip = (page - 1) * limit;

    // 3. Выполняем два запроса параллельно: данные и общее кол-во
    const [movies, total] = await Promise.all([
      this.prisma.movie.findMany({
        where,
        take: limit, // Сколько взять
        skip: skip, // Сколько пропустить
        orderBy: {
          [sortBy]: order, // Динамическая сортировка: { year: 'desc' }
        },
        include: {
          genres: true,
        },
      }),
      this.prisma.movie.count({ where }), // Считаем только те, что подходят под поиск
    ]);
    // 4. Формируем красивый ответ для фронта
    return {
      data: movies,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
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
