import { Property } from '../metrics/property';

export class Entity {

  id: number;
  name: string;

  expectedProperties: Property[];
  providedProperties: Property[];

  constructor(name: string) { }

}
