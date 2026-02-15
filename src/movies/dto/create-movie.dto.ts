import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required field' })
  @MinLength(1)
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Director is required field' })
  director: string;

  @IsInt()
  @Min(1895, { message: 'The movie industry starts in 1895' })
  year: number;

  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'Need more symbols (5)' })
  @MaxLength(1000, { message: 'Too long (1000 max)' })
  description: string;
}
