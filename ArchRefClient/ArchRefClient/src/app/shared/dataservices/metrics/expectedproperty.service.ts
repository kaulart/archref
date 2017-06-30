import { Logger } from '../../../../logger/logger';
import { ExpectedProperty } from '../../datamodels/metrics/expectedproperty';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - ExpectedPropertyService  - Implements the calls to the rest interface of the application server and
 *                                       handle the request construction and response extraction for ExpectedProperty data
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class ExpectedPropertyService {

  // URL of the REST Interface End-Point
  private expectedPropertyUrl = '/api/expectedproperties';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getExpectedProperties - Send GET all ExpectedProperties REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getExpectedProperties(): Observable<ExpectedProperty[]> {
    Logger.info('[REQUEST - ExpectedProperty] Send GET ExpectedProperties Request', ExpectedPropertyService.name);
    return this.http.get(this.expectedPropertyUrl).map(this.extractExpectedProperties).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getExpectedProperty - Send GET ExpectedProperty REQUEST
   *
   * @param - id: number - ID of the ExpectedProperty which should be retrieved from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public getExpectedProperty(id: number): Observable<ExpectedProperty> {
    Logger.info('[REQUEST - ExpectedProperty] Send GET ExpectedProperty Request with ID:' + id, ExpectedPropertyService.name);
    return this.http.get(this.expectedPropertyUrl + '/' + id).map(this.extractExpectedProperty).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - createExpectedProperty - Send POST ExpectedProperty REQUEST
   *
   * @param - expectedProperty: ExpectedProperty - ExpectedProperty which should be created
   *
   *******************************************************************************************************************************************************************************************************/
  public createExpectedProperty(expectedProperty: ExpectedProperty): Observable<ExpectedProperty> {
    Logger.info('[REQUEST - ExpectedProperty] Send POST ExpectedProperty Request', ExpectedPropertyService.name);
    Logger.data('[REQUEST - ExpectedProperty]' + JSON.stringify(expectedProperty), ExpectedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.expectedPropertyUrl, expectedProperty, options).map(this.extractExpectedProperty).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - updateExpectedProperty - Send PUT ExpectedProperty REQUEST
   *
   * @param - expectedProperty: ExpectedProperty - ExpectedProperty which should be updated
   *
   *******************************************************************************************************************************************************************************************************/
  public updateExpectedProperty(expectedProperty: ExpectedProperty): Observable<ExpectedProperty> {
    Logger.info('[REQUEST - ExpectedProperty] Send PUT Request ExpectedProperty', ExpectedPropertyService.name);
    Logger.data('[REQUEST - ExpectedProperty] ' + JSON.stringify(expectedProperty), ExpectedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.expectedPropertyUrl + '/' + expectedProperty.id, expectedProperty, options).map(this.extractExpectedProperty).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - deleteExpectedProperty - Send DELETE ExpectedProperty REQUEST
   *
   * @param - id: number - ID of the ExpectedProperty which should be deleted from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteExpectedProperty(id: number): Observable<ExpectedProperty> {
    Logger.info('[REQUEST - ExpectedProperty] Send DELETE ExpectedProperty Request with ID: ' + id, ExpectedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.expectedPropertyUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractExpectedPropertyDataList - Extract data from response data list
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  public extractExpectedProperties(res: Response) {
    let body = res.json();
    let expectedPropertyList: ExpectedProperty[] = [];
    Logger.info('[RESPONSE - ExpectedProperty]: Extract Data of Response Body', ExpectedPropertyService.name);
    Logger.data('[RESPONSE - ExpectedProperty]: ' + JSON.stringify(body), ExpectedPropertyService.name);
    for (let expectedProperty of body) {
      let tempExpectedProperty: ExpectedProperty = new ExpectedProperty(expectedProperty.name, expectedProperty.value);
      tempExpectedProperty = expectedProperty;
      expectedPropertyList.push(tempExpectedProperty);
    }
    return expectedPropertyList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractExpectedPropertyData - Extract data from response data object
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractExpectedProperty(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - ExpectedProperty]: Extract Data of Response Body', ExpectedPropertyService.name);
    Logger.data('[RESPONSE - ExpectedProperty]: ' + JSON.stringify(body), ExpectedPropertyService.name);
    let expectedProperty: ExpectedProperty = new ExpectedProperty(body.name, body.value);
    expectedProperty = body;
    return expectedProperty || {};
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
