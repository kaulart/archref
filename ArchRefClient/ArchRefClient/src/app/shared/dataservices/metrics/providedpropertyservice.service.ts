
import { Logger } from '../../../../logger/logger';
import { ProvidedProperty } from '../../datamodels/metrics/providedproperty';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProvidedPropertyService {

  // URL of the REST Interface End-Point
  private providedPropertyUrl = '/api/providedproperties';

  constructor(private http: Http) { }

  /******************************************************************************************************************
   *
   * Send GET all ProvidedProperties REQUEST
   *
   ******************************************************************************************************************/
  public getProvidedProperties(): Observable<ProvidedProperty[]> {
    Logger.info('[REQUEST - ProvidedProperty] Send GET ProvidedProperties Request', ProvidedPropertyService.name);
    return this.http.get(this.providedPropertyUrl).map(this.extractProvidedPropertyDataList).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send GET ProvidedProperty REQUEST
   *
   ******************************************************************************************************************/
  public getProvidedProperty(id: number): Observable<ProvidedProperty> {
    Logger.info('[REQUEST - ProvidedProperty] Send GET ProvidedProperty Request with ID:' + id, ProvidedPropertyService.name);
    return this.http.get(this.providedPropertyUrl + '/' + id).map(this.extractProvidedPropertyData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send POST ProvidedProperty REQUEST
   *
   ******************************************************************************************************************/
  public createProvidedProperty(providedProperty: ProvidedProperty): Observable<ProvidedProperty> {
    Logger.info('[REQUEST - ProvidedProperty] Send POST ProvidedProperty Request', ProvidedPropertyService.name);
    Logger.data('[REQUEST - ProvidedProperty]' + JSON.stringify(providedProperty), ProvidedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.providedPropertyUrl, providedProperty, options).map(this.extractProvidedPropertyData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send PUT ProvidedProperty REQUEST
   *
   ******************************************************************************************************************/
  public updateProvidedProperty(providedProperty: ProvidedProperty): Observable<ProvidedProperty> {
    Logger.info('[REQUEST - ProvidedProperty] Send PUT Request ProvidedProperty', ProvidedPropertyService.name);
    Logger.data('[REQUEST - ProvidedProperty] ' + JSON.stringify(providedProperty), ProvidedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.providedPropertyUrl + '/' + providedProperty.id, providedProperty, options).map(this.extractProvidedPropertyData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send DELETE ProvidedProperty REQUEST
   *
   ******************************************************************************************************************/
  public deleteProvidedProperty(id: number): Observable<ProvidedProperty> {
    Logger.info('[REQUEST - ProvidedProperty] Send DELETE ProvidedProperty Request with ID: ' + id, ProvidedPropertyService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.providedPropertyUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Extract data from response data list
   *
   ******************************************************************************************************************/
  public extractProvidedPropertyDataList(res) {
    let body = res.json();
    let propertyList: ProvidedProperty[] = [];
    Logger.info('[RESPONSE - ProvidedProperty]: Extract Data of Response Body', ProvidedPropertyService.name);
    Logger.data('[RESPONSE - ProvidedProperty]: ' + JSON.stringify(body), ProvidedPropertyService.name);
    for (let providedProperty of body) {
      let tempProvidedProperty: ProvidedProperty = new ProvidedProperty(providedProperty.name, providedProperty.value);
      tempProvidedProperty.id = providedProperty.id;
      tempProvidedProperty.entityProvidedId = providedProperty.entityProvidedId;
      propertyList.push(tempProvidedProperty);
    }
    return propertyList || {};
  }

  /******************************************************************************************************************
   *
   *  Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractProvidedPropertyData(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - ProvidedProperty]: Extract Data of Response Body', ProvidedPropertyService.name);
    Logger.data('[RESPONSE - PROPERTY]: ' + JSON.stringify(body), ProvidedPropertyService.name);
    let providedProperty: ProvidedProperty = new ProvidedProperty(body.name, body.value);
    providedProperty.id = body.id;

    providedProperty.entityProvidedId = body.entityProvidedId;
    return providedProperty || {};
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
