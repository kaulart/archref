export class Utility {

  static deleteElementFromArry(id: number, array: any[]) {
    array = array.filter(function(obj) {

      return obj.id !== id;
    });

    return array;

  }

}
