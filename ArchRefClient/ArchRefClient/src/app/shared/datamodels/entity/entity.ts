import { ExpectedProperty } from '../metrics/expectedproperty';
import { ProvidedProperty } from '../metrics/providedproperty';

/*******************************************************************************************************************************************************************************************************
 *
 * @data - Entity Data Model - Superclass for all entities like LevelGraphNodes, NodeTypes, NodeTemplates. etc. if you want to extend the data of all this objects for example with metrics put this
 *                             data as fields into this class like the expected and provided properties.
 *
 * @field - id: number - ID of the Entity
 * @field - name: string - Name of the Entity
 * @field - expectedProperties: ExpectedProperty[] - Array of expected properties of the entity
 * @field - providedProperties: ProvidedProperty[] - Array of provided properties of the entity
 *
 * //TODO Further improvement: You may decide to add an view object as field for graphical representation to decouple view data from processing data
 * //TODO Currently only a default constructor is supported one some data models you may decide to overload this constructors
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class Entity {

  id: number;
  name: string;
  expectedProperties: ExpectedProperty[] = [];
  providedProperties: ProvidedProperty[] = [];

  icon = '/assets/img/nodeTypeDefault.png';

  constructor() {
    this.id = null;
    this.name = 'Unnamed';
    this.expectedProperties = [];
    this.providedProperties = [];
  }

}
