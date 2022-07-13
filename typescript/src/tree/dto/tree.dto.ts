import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateTreeDto {
  @IsNumber()
  parent?: number;

  @IsString()
  @IsNotEmpty()
  label: string;
}
