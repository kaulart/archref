
export class Repository {

  name: string;
  id: number;

  constructor(name: string) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

   public getID() {
    return this.name;
  }

}
