import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsInt({ message: 'целое число, от 1 до 10' })
  @Min(1, { message: 'целое число, от 1' })
  @Max(10, { message: 'целое число, до 10' })
  @IsOptional()
  rating?: number;

  @IsBoolean()
  @IsOptional()
  isWatched?: boolean;

  @IsString()
  @MinLength(5, { message: 'Need more symbols (5)' })
  @MaxLength(1000, { message: 'Too long (500 max)' })
  @IsOptional()
  notes?: string;
}
