import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateStoryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  startPoint: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  endPoint: number;
}
