import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class NewUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(20)
  password: string;
}
