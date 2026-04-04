import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SortOrder } from '../../../interfaces/sort.interface';

export class FilterMoviesDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  genreId: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isWatched: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1895, { message: 'The movie industry starts in 1895' })
  yearFrom: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1895, { message: 'The movie industry starts in 1895' })
  yearTo: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'целое число, от 1 до 10' })
  @Min(1, { message: 'целое число, от 1' })
  @Max(10, { message: 'целое число, до 10' })
  ratingFrom: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'целое число, от 1 до 10' })
  @Min(1, { message: 'целое число, от 1' })
  @Max(10, { message: 'целое число, до 10' })
  ratingTo: number;

  // navigation options
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number = 1; //(по умолчанию 1)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit: number = 10; //(по умолчанию 10)

  // sort options
  @IsOptional()
  @IsString()
  sortBy: string = 'year';

  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder = SortOrder.DESC;
}
