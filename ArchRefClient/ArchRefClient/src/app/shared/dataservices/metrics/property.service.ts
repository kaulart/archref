import { Logger } from '../../../../logger/logger';
import { Property } from '../../datamodels/metrics/property';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service PropertyService  - Implements the calls to the rest interface of the application server and
 *                             handle the request construction and response extraction for Property data
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class PropertyService {

  // URL of the REST Interface End-Point
  private propertyUrl = '/api/properties';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET all Properties REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getProperties(): Observable<Property[]> {
    Logger.info('[REQUEST - PROPERTY] Send GET Properties Request', PropertyService.name);
    return this.http.get(this.propertyUrl).map(this.extractPropertyDataList).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET Property REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getProperty(id: number): Observable<Property> {
    Logger.info('[REQUEST - PROPERTY] Send GET Property Request with ID:' + id, PropertyService.name);
    return this.http.get(this.propertyUrl + '/' + id).map(this.extractPropertyData).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send POST Property REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public createProperty(property: Property): Observable<Property> {
    Logger.info('[REQUEST - PROPERTY] Send POST Property Request', PropertyService.name);
    Logger.data('[REQUEST - PROPERTY]' + JSON.stringify(property), PropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.propertyUrl, property, options).map(this.extractPropertyData).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send PUT Property REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public updateProperty(property: Property): Observable<Property> {
    Logger.info('[REQUEST - PROPERTY] Send PUT Request Property', PropertyService.name);
    Logger.data('[REQUEST - PROPERTY] ' + JSON.stringify(property), PropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.propertyUrl + '/' + property.id, property, options).map(this.extractPropertyData).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send DELETE Property REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteProperty(id: number): Observable<Property> {
    Logger.info('[REQUEST - PROPERTY] Send DELETE NodeType Request with ID: ' + id, PropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.propertyUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data list
   *
   *******************************************************************************************************************************************************************************************************/
  public extractPropertyDataList(res) {
    Logger.info('[RESPONSE - PROPERTY]: Extract Data of Response Body', PropertyService.name);
    let body = res.json();
    let propertyList: Property[] = [];
    Logger.data('[RESPONSE - PROPERTY]: ' + JSON.stringify(body), PropertyService.name);
    for (let property of body) {
      let tempProperty: Property = new Property(property.name, property.value);
      tempProperty.id = property.id;
      propertyList.push(tempProperty);
    }
    return propertyList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractPropertyData(res: Response) {
    Logger.info('[RESPONSE - PROPERTY]: Extract Data of Response Body', PropertyService.name);
    let body = res.json();
    Logger.data('[RESPONSE - PROPERTY]: ' + JSON.stringify(body), PropertyService.name);
    let property: Property = new Property(body.name, body.value);
    property.id = body.id;
    return property || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @error - Error Handling
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
