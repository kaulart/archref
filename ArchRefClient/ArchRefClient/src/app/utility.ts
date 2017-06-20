/*********************************************************************************************************************************************************************************************************
 *
 * @class - Utility - Helper class for different methods like update a element in an array or delete an element from an array
 *
 * @author - Arthur Kaul
 *
 ********************************************************************************************************************************************************************************************************/
export class Utility {

  /*******************************************************************************************************************************************************************************************************
   *
   * @method - deleteElementFromArry - Delete an element from an array
   *
   * @param - id: number - ID of the element which should be removed from the array
   * @param - array: any[] - Array of the elements
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
   * @method - updateElementInArry - Update an element from an array
   *
   * @param - element: any - Element which should be updated in the array
   * @param - array: any[] - Array of the elements
   *
   ******************************************************************************************************************************************************************************************************/
  static updateElementInArry(element: any, array: any[]) {

    for (let i = 0; i < array.length; i++) {

      if (element.id === array[i].id) {
        array[i] = element;
      }

    }

    return array;
  }

}
