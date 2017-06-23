import { Entity } from '../entity/entity';
import { Path } from '../utility/path';

/*******************************************************************************************************************************************************************************************************
 *
 * @class - Relation - Superclass for all models which should be displayed as lines in GraphModellerComponents. It extends the entity class.
 *
 * @class Entity
 * @superField - id: number - ID of the Relation
 * @superField - name: string - Name of the Relation
 * @superField - expectedProperties: ExpectedProperty[] - Array of expected properties of the Relation
 * @superField - providedProperties: ProvidedProperty[] - Array of provided properties of the Relation
 *
 * @field - sourceNodeId: number - ID of the Source Node of relation
 * @field - targetNodeId: number - ID of the Target Node of relation
 * @field - path: Path - Path of the line from source node to target node
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
