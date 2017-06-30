
import { Logger } from '../../../../logger/logger';
import { ProvidedProperty } from '../../datamodels/metrics/providedproperty';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service ProvidedPropertyService - Implements the calls to the rest interface of the application server and
 *                                    handle the request construction and response extraction for ProvidedProperty data
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class ProvidedPropertyService {

  // URL of the REST Interface End-Point
  private providedPropertyUrl = '/api/providedproperties';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getProvidedProperties - Send GET all ProvidedProperties REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getProvidedProperties(): Observable<ProvidedProperty[]> {
    Logger.info('[REQUEST - ProvidedProperty] Send GET ProvidedProperties Request', ProvidedPropertyService.name);
    return this.http.get(this.providedPropertyUrl).map(this.extractProvidedProperties).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getProvidedProperty - Send GET ProvidedProperty REQUEST
   *
   * @param - id: number - ID of the ProvidedProperty which should be retrieved from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public getProvidedProperty(id: number): Observable<ProvidedProperty> {
    Logger.info('[REQUEST - ProvidedProperty] Send GET ProvidedProperty Request with ID:' + id, ProvidedPropertyService.name);
    return this.http.get(this.providedPropertyUrl + '/' + id).map(this.extractProvidedProperty).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - createProvidedProperty - Send POST ProvidedProperty REQUEST
   *
   * @param - providedProperty: ProvidedProperty - ProvidedProperty which should be created
   *
   *******************************************************************************************************************************************************************************************************/
  public createProvidedProperty(providedProperty: ProvidedProperty): Observable<ProvidedProperty> {
    Logger.info('[REQUEST - ProvidedProperty] Send POST ProvidedProperty Request', ProvidedPropertyService.name);
    Logger.data('[REQUEST - ProvidedProperty]' + JSON.stringify(providedProperty), ProvidedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.providedPropertyUrl, providedProperty, options).map(this.extractProvidedProperty).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - updateProvidedProperty - Send PUT ProvidedProperty REQUEST
   *
   * @param - providedProperty: ProvidedProperty - ProvidedProperty which should be updated
   *
   *******************************************************************************************************************************************************************************************************/
  public updateProvidedProperty(providedProperty: ProvidedProperty): Observable<ProvidedProperty> {
    Logger.info('[REQUEST - ProvidedProperty] Send PUT Request ProvidedProperty', ProvidedPropertyService.name);
    Logger.data('[REQUEST - ProvidedProperty] ' + JSON.stringify(providedProperty), ProvidedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.providedPropertyUrl + '/' + providedProperty.id, providedProperty, options).map(this.extractProvidedProperty).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - deleteProvidedProperty - Send DELETE ProvidedProperty REQUEST
   *
   * @param - id: number - ID of the ProvidedProperty which should be deleted from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteProvidedProperty(id: number): Observable<ProvidedProperty> {
    Logger.info('[REQUEST - ProvidedProperty] Send DELETE ProvidedProperty Request with ID: ' + id, ProvidedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.providedPropertyUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractProvidedProperties -  Extract data from response data list
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  public extractProvidedProperties(res: Response) {
    let body = res.json();
    let propertyList: ProvidedProperty[] = [];
    Logger.info('[RESPONSE - ProvidedProperty]: Extract Data of Response Body', ProvidedPropertyService.name);
    Logger.data('[RESPONSE - ProvidedProperty]: ' + JSON.stringify(body), ProvidedPropertyService.name);
    for (let providedProperty of body) {
      let tempProvidedProperty: ProvidedProperty = new ProvidedProperty(providedProperty.name, providedProperty.value);
      tempProvidedProperty = providedProperty;
      propertyList.push(tempProvidedProperty);
    }
    return propertyList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractProvidedProperty - Extract data from response data object
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractProvidedProperty(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - ProvidedProperty]: Extract Data of Response Body', ProvidedPropertyService.name);
    Logger.data('[RESPONSE - PROPERTY]: ' + JSON.stringify(body), ProvidedPropertyService.name);
    let providedProperty: ProvidedProperty = new ProvidedProperty(body.name, body.value);
    providedProperty = body;
    return providedProperty || {};
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
