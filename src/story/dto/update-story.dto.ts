import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { typeOfStory } from '../story.interface';

export class UpdateStoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: typeOfStory;

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
