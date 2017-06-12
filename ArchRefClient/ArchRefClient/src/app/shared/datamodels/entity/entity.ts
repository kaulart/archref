import { ExpectedProperty } from '../metrics/expectedproperty';
import { ProvidedProperty } from '../metrics/providedproperty';

export class Entity {

  id: number;
  name: string;

  expectedProperties: ExpectedProperty[] = [];
  providedProperties: ProvidedProperty[] = [];

  icon = '/assets/img/nodeTypeDefault.png';

  constructor(name: string) {
    this.name = name;
  }

}
