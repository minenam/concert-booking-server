export class Queue {
  constructor(
    public id: number,
    public userId: string,
    public position: number,
    public createdAt: Date,
  ) {}
}
