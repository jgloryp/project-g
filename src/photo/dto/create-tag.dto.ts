import { IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
