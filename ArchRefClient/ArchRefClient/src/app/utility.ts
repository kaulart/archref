import { LevelGraph } from './shared/datamodels/levelgraph/levelgraph';

/*********************************************************************************************************************************************************************************************************
 *
 * @class Utility Helper class for different methods like update a element in an array or delete an element from an array
 *
 * @author Arthur Kaul
 *
 ********************************************************************************************************************************************************************************************************/
export class Utility {

  /*******************************************************************************************************************************************************************************************************
   *
   * @method deleteElementFromArry - Delete an element from an array
   *
   ******************************************************************************************************************************************************************************************************/
  static deleteElementFromArry(id: number, array: any[]) {
    array = array.filter(function(obj) {

      return obj.id !== id;
    });

    return array;

  }

 /*******************************************************************************************************************************************************************************************************
   *
   * @method updateElementInArry - Update an element from an array
   *
   ******************************************************************************************************************************************************************************************************/
  static updateElementInArry(res: any, array: any[]) {

    for (let i = 0; i < array.length; i++) {

      if (res.id === array[i].id) {
        array[i] = res;
      }

    }

    return array;
  }

  static initializeMatrixRepresentation(levelGraph: LevelGraph, levelGraphMatrix: number[][][], refienToMatrix: number[][][], connectedToMatrix: number[][][], hostedOnMatrix: number[][][]) {
    // TODO
  }

}
