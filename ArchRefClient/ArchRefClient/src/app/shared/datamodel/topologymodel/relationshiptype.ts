import { Repository } from '../repository';
import { Property } from './property';

export class RelationshipType {

  id: number = null;
  name: string;
  repositoryRelationshipType: Repository;

  icon = '/assets/img/relationTypeDefault.png';
  providedProperties: Property[];

  constructor(name: string, repository: Repository) {
    this.name = name;
    this.repositoryRelationshipType = repository;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getRepository(): Repository {
    return this.repositoryRelationshipType;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setRepository(repositoryRelationshipType: Repository) {
    this.repositoryRelationshipType = repositoryRelationshipType;
  }

}
