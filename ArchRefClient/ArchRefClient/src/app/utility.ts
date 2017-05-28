export class Utility {

  static deleteElementFromArry(id: number, array: any[]) {
    array = array.filter(function(obj) {

      return obj.id !== id;
    });

    return array;

  }
  static updateElementInArry(res: any, array: any[]) {

    for (let i = 0; i < array.length; i++) {

      if (res.id === array[i].id) {
        array[i] = res;
      }

    }

    return array;
  }
}
