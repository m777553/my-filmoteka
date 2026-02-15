import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  private GENRES: Genre[] = [
    { id: 1, name: 'Боевик' },
    { id: 2, name: 'Комедия' },
    { id: 3, name: 'Драма' },
    { id: 4, name: 'Фантастика' },
    { id: 5, name: 'Ужасы' },
  ];
  private nextId = 6;
  create(createGenreDto: CreateGenreDto) {
    const genre: Genre = { ...createGenreDto, id: this.nextId++ };
    this.GENRES.push(genre);
    return genre;
  }

  // createSeveral(createGenresDto: string[]) {
  //   const genres: Genre[] = createGenresDto.map((genre: string) => ({
  //     name: genre,
  //     id: this.nextId++,
  //   }));
  //   this.GENRES.push(...genres);
  //   return genres;
  // }

  findAll() {
    return this.GENRES;
  }

  findOne(id: number) {
    const genre = this.GENRES.find((genre) => genre.id === id);
    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found`);
    }
    return genre;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    const genre = this.findOne(id);
    Object.assign(genre, updateGenreDto);
    return genre;
  }

  remove(id: number) {
    this.findOne(id);
    this.GENRES = this.GENRES.filter((g) => g.id !== id);
  }
}
