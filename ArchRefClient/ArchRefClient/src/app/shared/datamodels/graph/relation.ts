import { Entity } from '../entity/entity';
import { Path } from '../utility/path';

/*******************************************************************************************************************************************************************************************************
 *
 * @data - Relation Data Model - Superclass for all models which should be displayed as lines in GraphModellerComponents. It extends the entity class.
 *
 * @Entity
 * @superFields - id: number - ID of the Relation
 * @superFields - name: string - Name of the Relation
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the Relation
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the Relation
 *
 * @fields - sourceNodeId: number - ID of the Source Node of relation
 * @fields - targetNodeId: number - ID of the Target Node of relation
 * @fields - path: Path - Path of the line from source node to target node
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
export class Relation extends Entity {

  sourceNodeId: number;
  targetNodeId: number;
  path: Path;

  constructor(sourceNodeId: number, targetNodeId: number, path: Path) {
    super();
    this.sourceNodeId = sourceNodeId;
    this.targetNodeId = targetNodeId;
    this.path = path;
  };

  /*****************************************************************************************************************************************************************************************************
   *
   * @method - isSourceNodeEqualTargetNode - Check if the relation is a self-loop relation
   *
   ****************************************************************************************************************************************************************************************************/
  isSourceNodeEqualTargetNode() {
    return (this.sourceNodeId === this.targetNodeId);
  }

}
