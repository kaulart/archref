import { Logger } from '../../../../logger/logger';
import { Property } from '../../datamodels/metrics/property';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - PropertyService  - Implements the calls to the rest interface of the application server and
 *                               handle the request construction and response extraction for Property data
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class PropertyService {

  // URL of the REST Interface End-Point
  private propertyUrl = '/api/properties';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getProperties - Send GET all Properties REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getProperties(): Observable<Property[]> {
    Logger.info('[REQUEST - PROPERTY] Send GET Properties Request', PropertyService.name);
    return this.http.get(this.propertyUrl).map(this.extractProperties).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getProperty - Send GET Property REQUEST
   *
   * @param - id: number - Property which should be created
   *
   *******************************************************************************************************************************************************************************************************/
  public getProperty(id: number): Observable<Property> {
    Logger.info('[REQUEST - PROPERTY] Send GET Property Request with ID:' + id, PropertyService.name);
    return this.http.get(this.propertyUrl + '/' + id).map(this.extractProperty).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - createProperty - Send POST Property REQUEST
   *
   * @param - property: Property - Property which should be created
   *
   *******************************************************************************************************************************************************************************************************/
  public createProperty(property: Property): Observable<Property> {
    Logger.info('[REQUEST - PROPERTY] Send POST Property Request', PropertyService.name);
    Logger.data('[REQUEST - PROPERTY]' + JSON.stringify(property), PropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.propertyUrl, property, options).map(this.extractProperty).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - updateProperty - Send PUT Property REQUEST
   *
   * @param - property: Property - Property which should be updated
   *
   *******************************************************************************************************************************************************************************************************/
  public updateProperty(property: Property): Observable<Property> {
    Logger.info('[REQUEST - PROPERTY] Send PUT Request Property', PropertyService.name);
    Logger.data('[REQUEST - PROPERTY] ' + JSON.stringify(property), PropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.propertyUrl + '/' + property.id, property, options).map(this.extractProperty).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - deleteProperty - Send DELETE Property REQUEST
   *
   * @param - id: number - ID of the Property which should be deleted from the database
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
   * @response -extractProperties - Extract data from response data list
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  public extractProperties(res: Response) {
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
   * @response - extractProperty - Extract data from response data object
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractProperty(res: Response) {
    Logger.info('[RESPONSE - PROPERTY]: Extract Data of Response Body', PropertyService.name);
    let body = res.json();
    Logger.data('[RESPONSE - PROPERTY]: ' + JSON.stringify(body), PropertyService.name);
    let property: Property = new Property(body.name, body.value);
    property.id = body.id;
    return property || {};
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
