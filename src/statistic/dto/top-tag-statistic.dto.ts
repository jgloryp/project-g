export class TopTagcDto {
  tag: string;
  countTags: number;

  constructor(tag: string, countTags: number) {
    this.tag = tag;
    this.countTags = countTags;
  }
}
