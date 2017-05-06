
export class Repository {

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

}
