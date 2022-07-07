import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
