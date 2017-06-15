import { Logger } from '../../../../logger/logger';
import { FragmentType } from '../../datamodels/types/fragmenttype';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

/********************************************************************************************************************
 *
 * @service - FragmentTypeService implements the calls to the rest interface of the application server and
 *            handle the request construction and response extraction for FragmentTypes
 *
 ********************************************************************************************************************/
@Injectable()
export class FragmentTypeService {

  // URL of the REST Interface End-Point
  private fragmentTypeUrl = '/api/fragmenttypes';

  constructor(private http: Http) { }

  /******************************************************************************************************************
   *
   * @request - Send GET all FragmentTypes REQUEST
   *
   ******************************************************************************************************************/
  public getFragmentTypes(): Observable<FragmentType[]> {
    Logger.info('[REQUEST - FRAGMENTTYPE]: Send GET FragmentType Request', FragmentTypeService.name);
    return this.http.get(this.fragmentTypeUrl).map(this.extractFragmentTypes).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send GET FragmentType REQUEST
   *
   ******************************************************************************************************************/
  public getFragmentType(id: number): Observable<FragmentType> {
    Logger.info('[REQUEST - FRAGMENTTYPE]: Send GET FragmentType Request with ID:' + id, FragmentTypeService.name);
    return this.http.get(this.fragmentTypeUrl + '/' + id).map(this.extractFragmentType).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send POST FragmentType REQUEST
   *
   ******************************************************************************************************************/
  public createFragmentType(fragmentType: FragmentType): Observable<FragmentType> {
    Logger.info('[REQUEST - FRAGMENTTYPE]: Send POST FragmentType Request', FragmentTypeService.name);
    Logger.data(JSON.stringify(fragmentType), FragmentTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.fragmentTypeUrl, fragmentType, options).map(this.extractFragmentType).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send PUT FragmentType REQUEST
   *
   ******************************************************************************************************************/
  public updateFragmentType(fragmentType: FragmentType): Observable<FragmentType> {
    Logger.info('[REQUEST - FRAGMENTTYPE]: Send PUT FragmentType Request', FragmentTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.fragmentTypeUrl + '/' + fragmentType.id, fragmentType, options).map(this.extractFragmentType).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send DELETE FragmentType REQUEST
   *
   ******************************************************************************************************************/
  public deleteFragmentType(id: number): Observable<FragmentType> {
    Logger.info('[REQUEST - FRAGMENTTYPE]: Send DELETE FragmentType Request with ID: ' + id, FragmentTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.fragmentTypeUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @response - Extract data from response data list
   *
   ******************************************************************************************************************/
  private extractFragmentTypes(res: Response) {
    Logger.info('[RESPONSE - FRAGMENTTYPE]: Extract Data of Response Body', FragmentTypeService.name);
    let body = res.json();
    let fragmentTypes: FragmentType[] = [];
    Logger.data('[RESPONSE - FRAGMENTTYPE]: ' + JSON.stringify(body), FragmentTypeService.name);
    for (let fragmentType of body) {
      let tempFragmentType: FragmentType = new FragmentType(fragmentType.name);
      tempFragmentType.id = fragmentType.id;
      tempFragmentType.icon = fragmentType.icon;
      tempFragmentType.expectedProperties = fragmentType.expectedProperties;
      tempFragmentType.providedProperties = fragmentType.providedProperties;
      fragmentTypes.push(tempFragmentType);
    }
    return fragmentTypes || {};
  }

  /******************************************************************************************************************
   *
   * @response - Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractFragmentType(res: Response) {
    let body = res.json();
    Logger.info('Extract Data of Response Body', FragmentTypeService.name);
    Logger.data('[RESPONSE - FRAGMENTTYPE]: ' + JSON.stringify(body), FragmentTypeService.name);
    let fragmentType: FragmentType = new FragmentType(body.name);
    fragmentType.id = body.id;
    fragmentType.icon = body.icon;
    fragmentType.expectedProperties = body.expectedProperties;
    fragmentType.providedProperties = body.providedProperties;
    return fragmentType || {};
  }

  /******************************************************************************************************************
   *
   * @error - Error Handling
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
