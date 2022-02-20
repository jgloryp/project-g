export class ListPhotoItem {
  name: string;
  url: string;
  createdAt: Date;

  constructor(name: string, url: string, createdAt: Date) {
    this.name = name;
    this.url = url;
    this.createdAt = createdAt;
  }
}
