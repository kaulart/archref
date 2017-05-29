import { Repository } from '../repository';
import { Property } from './property';

export class NodeType {

  id: number = null;
  name: string;
  icon = '/assets/img/nodeTypeDefault.png';
  providedProperties: Property[];

  repositoryNodeType: Repository;

  constructor(name: string, repositoryNodeType: Repository) {
    this.name = name;
    this.repositoryNodeType = repositoryNodeType;
  }
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getRepository(): Repository {
    return this.repositoryNodeType;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setRepository(repository: Repository) {
    this.repositoryNodeType = repository;
  }

}
