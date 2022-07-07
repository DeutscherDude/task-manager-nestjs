import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  user_id: string;
}
