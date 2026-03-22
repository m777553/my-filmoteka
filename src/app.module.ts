import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MoviesModule, GenresModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
