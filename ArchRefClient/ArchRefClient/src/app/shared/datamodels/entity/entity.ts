import { ExpectedProperty } from '../metrics/expectedproperty';
import { ProvidedProperty } from '../metrics/providedproperty';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - Entity - Superclass for all entities like LevelGraphNodes, NodeTypes, NodeTemplates. etc. if you want to extend the data of all this objects for example with metrics put this
 *                   data as fields into this class like the expected and provided properties.
 *
 * @field - id: number - ID of the Entity
 * @field - name: string - Name of the Entity
 * @field - expectedProperties: ExpectedProperty[] - Array of expected properties of the entity
 * @field - providedProperties: ProvidedProperty[] - Array of provided properties of the entity
 *
 * @hint - Further improvement: You may decide to add an view object as field for graphical representation to decouple view data from processing data
 * @hint - Currently only a default constructor is supported one some data models you may decide to overload this constructors
 * @hint - Currently no getters and setters are used for accessing the fields you may decide to implement them. But this may lead to errors at runtime if you set the fields to private because,
 *         sometimes you have Objects of type any which don`t no the getter and setter of the field and you have to at this places the . operator.
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class Entity {

  id: number;
  name: string;
  expectedProperties: ExpectedProperty[];
  providedProperties: ProvidedProperty[];

  icon: string;

  constructor() {
    this.id = null;
    this.name = 'Unnamed';
    this.expectedProperties = [];
    this.providedProperties = [];
    this.icon = '/assets/img/nodeTypeDefault.png';
  }

}
