/*******************************************************************************************************************************************************************************************************
 *
 * @class - Property - Properties are name value pairs
 *
 * @field - id: number - Id of the Property
 * @field - name: string - Name of the Property
 * @field - value: string - Value of the Property
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class Property {

  id: number = null;
  name = 'Unnamed';
  value = 'Undefined';

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

}
