import { Logger } from '../../../../logger/logger';
import { ExpectedProperty } from '../../datamodels/metrics/expectedproperty';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ExpectedPropertyService {

  // URL of the REST Interface End-Point
  private expectedPropertyUrl = '/api/expectedproperties';

  constructor(private http: Http) { }

  /******************************************************************************************************************
   *
   * Send GET all ExpectedProperties REQUEST
   *
   ******************************************************************************************************************/
  public getExpectedProperties(): Observable<ExpectedProperty[]> {
    Logger.info('[REQUEST - ExpectedProperty] Send GET ExpectedProperties Request', ExpectedPropertyService.name);
    return this.http.get(this.expectedPropertyUrl).map(this.extractExpectedPropertyDataList).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send GET ExpectedProperty REQUEST
   *
   ******************************************************************************************************************/
  public getExpectedProperty(id: number): Observable<ExpectedProperty> {
    Logger.info('[REQUEST - ExpectedProperty] Send GET ExpectedProperty Request with ID:' + id, ExpectedPropertyService.name);
    return this.http.get(this.expectedPropertyUrl + '/' + id).map(this.extractExpectedPropertyData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send POST ExpectedProperty REQUEST
   *
   ******************************************************************************************************************/
  public createExpectedProperty(expectedProperty: ExpectedProperty): Observable<ExpectedProperty> {
    Logger.info('[REQUEST - ExpectedProperty] Send POST ExpectedProperty Request', ExpectedPropertyService.name);
    Logger.data('[REQUEST - ExpectedProperty]' + JSON.stringify(expectedProperty), ExpectedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.expectedPropertyUrl, expectedProperty, options).map(this.extractExpectedPropertyData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send PUT ExpectedProperty REQUEST
   *
   ******************************************************************************************************************/
  public updateExpectedProperty(expectedProperty: ExpectedProperty): Observable<ExpectedProperty> {
    Logger.info('[REQUEST - ExpectedProperty] Send PUT Request ExpectedProperty', ExpectedPropertyService.name);
    Logger.data('[REQUEST - ExpectedProperty] ' + JSON.stringify(expectedProperty), ExpectedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.expectedPropertyUrl + '/' + expectedProperty.id, expectedProperty, options).map(this.extractExpectedPropertyData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send DELETE ExpectedProperty REQUEST
   *
   ******************************************************************************************************************/
  public deleteExpectedProperty(id: number): Observable<ExpectedProperty> {
    Logger.info('[REQUEST - ExpectedProperty] Send DELETE ExpectedProperty Request with ID: ' + id, ExpectedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.expectedPropertyUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Extract data from response data list
   *
   ******************************************************************************************************************/
  public extractExpectedPropertyDataList(res) {
    let body = res.json();
    let expectedPropertyList: ExpectedProperty[] = [];
    Logger.info('[RESPONSE - ExpectedProperty]: Extract Data of Response Body', ExpectedPropertyService.name);
    Logger.data('[RESPONSE - ExpectedProperty]: ' + JSON.stringify(body), ExpectedPropertyService.name);
    for (let expectedProperty of body) {
      let tempExpectedProperty: ExpectedProperty = new ExpectedProperty();
      tempExpectedProperty.id = expectedProperty.id;
      tempExpectedProperty.name = expectedProperty.name;
      tempExpectedProperty.value = expectedProperty.value;
      tempExpectedProperty.entityExpectedId = expectedProperty.entityExpectedId;
      expectedPropertyList.push(tempExpectedProperty);
    }
    return expectedPropertyList || {};
  }

  /******************************************************************************************************************
   *
   *  Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractExpectedPropertyData(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - ExpectedProperty]: Extract Data of Response Body', ExpectedPropertyService.name);
    Logger.data('[RESPONSE - ExpectedProperty]: ' + JSON.stringify(body), ExpectedPropertyService.name);
    let expectedProperty: ExpectedProperty = new ExpectedProperty();
    expectedProperty.id = body.id;
    expectedProperty.name = body.name;
    expectedProperty.value = body.value;
    expectedProperty.entityExpectedId = body.entityExpectedId;
    return expectedProperty || {};
  }

  /******************************************************************************************************************
   *
   *  Error Handling
   *
   ******************************************************************************************************************/
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
