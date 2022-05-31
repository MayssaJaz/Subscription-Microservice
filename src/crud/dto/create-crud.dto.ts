import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateCrudDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  idProduct: string;
}
