export class Logger {


  static data(msg: string, classType: any) {

    console.log('[DATA] ' + classType + '  [Message:]  ' + msg);

  }

  static info(msg: string, classType: any) {

    console.log('[INFO] ' + classType + '  [Message:]  ' + msg);

  }

  static warning(msg: string, classType: any) {

    console.warn('[WARNING] ' + classType + '  [Message:]  ' + msg);

  }

  static error(msg: string, classType: any) {

    console.error('[ERROR] ' + classType + '  [Message:]  ' + msg);

  }

}
