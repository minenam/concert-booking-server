export class User {
  constructor(
    public id: string,
    public balance: number,
    public queueToken: string | null = null,
  ) {}
}
