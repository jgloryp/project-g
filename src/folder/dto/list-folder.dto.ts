export class ListFolderItem {
  name: string;
  createdAt: Date;
  countPhotos: number;

  constructor(name: string, createdAt: Date, countPhotos: number) {
    this.name = name;
    this.createdAt = createdAt;
    this.countPhotos = countPhotos;
  }
}
