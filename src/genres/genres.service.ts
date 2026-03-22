import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    return this.prisma.genre.create({ data: createGenreDto });
  }

  async findAll() {
    return this.prisma.genre.findMany();
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({ where: { id } });
    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found`);
    }
    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    return this.prisma.genre.update({ where: { id }, data: updateGenreDto });
  }

  async remove(id: number) {
    await this.prisma.genre.delete({ where: { id } });
  }
}
