import { IsString, IsUrl } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}
