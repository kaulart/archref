import { Logger } from '../../../logger/logger';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - ExportXmlService  - Implements the calls to the rest interface of the application server and
 *                                handle the request construction and response extraction for RelationshipTypeFragment data
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class ExportXmlService {

  // URL of the REST Interface End-Point
  private exportUrl = '/api/export/xml';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getXmlFile - XML export request to the server for different type of data
   *
   *******************************************************************************************************************************************************************************************************/
  public getXmlFile(urlPart: string): Observable<Blob> {
    Logger.info('[REQUEST - EXPORT] Send GET XML-File Request', ExportXmlService.name);
    let headers = new Headers({ 'Content-Type': 'application/xml', responseType: ResponseContentType.Text});
    let options = new RequestOptions(headers);
    return this.http.get(this.exportUrl + urlPart, options).map(response => new Blob([response.text()], {type: 'application/xml'})).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @error - handleError - Error Handling
   *
   * @param - error: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
