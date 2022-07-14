import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export default class CreateTreeDto {
  @IsNumber()
  @IsOptional()
  parent?: number;

  @IsString()
  @IsNotEmpty()
  label: string;
}
