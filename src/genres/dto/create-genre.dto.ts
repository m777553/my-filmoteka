import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty({
    message: 'строка, не пустое, минимум 2 символа, максимум 50 символов',
  })
  @IsString()
  @MinLength(2, { message: 'Need more symbols (2)' })
  @MaxLength(50, { message: 'Too long (50 max)' })
  name: string;
}
