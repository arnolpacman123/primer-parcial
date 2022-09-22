import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}
