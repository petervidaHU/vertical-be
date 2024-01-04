import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { typeOfStory } from '../story.interface';

export class CreateStoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  type: typeOfStory;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  startPoint: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  endPoint: number;
}
