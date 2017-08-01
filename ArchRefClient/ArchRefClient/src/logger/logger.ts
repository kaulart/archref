/*********************************************************************************************************************************************************************************************************
 *
 * @class - Logger - Helper class for customized logging
 *
 * @hint - Further improvement write a log file to the file system and improve the representation of JSON Objects in the console currently only displayed as string
 *
 * @author Arthur Kaul
 *
 ********************************************************************************************************************************************************************************************************/
export class Logger {

  /*******************************************************************************************************************************************************************************************************
   *
   * @method data - Logger for data objects
   *
   * @param - msg: string - String which should be written to log
   * @param - className: any - Name of the class where the Logger was called
   *
   ******************************************************************************************************************************************************************************************************/
  static data(msg: string, className: any) {
    console.log('[DATA] ' + className + '  [Message:]  ' + msg);
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method data - Logger for info messages
   *
   * @param - msg: string - String which should be written to log
   * @param - className: any - Name of the class where the Logger was called
   *
   ******************************************************************************************************************************************************************************************************/
  static info(msg: string, className: any) {

    console.log('[INFO] ' + className + '  [Message:]  ' + msg);

  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method warning - Logger for warning messages
   *
   * @param - msg: string - String which should be written to log
   * @param - className: any - Name of the class where the Logger was called
   *
   ******************************************************************************************************************************************************************************************************/
  static warning(msg: string, className: any) {

    console.warn('[WARNING] ' + className + '  [Message:]  ' + msg);

  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @method error - Logger for error messages
   *
   * @param - msg: string - String which should be written to log
   * @param - className: any - Name of the class where the Logger was called
   *
   ******************************************************************************************************************************************************************************************************/
  static error(msg: string, className: any) {

    console.error('[ERROR] ' + className + '  [Message:]  ' + msg);

  }

}
