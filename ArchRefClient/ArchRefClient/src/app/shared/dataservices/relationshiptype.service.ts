

import { Logger } from '../../../logger/logger';
import { RelationshipType } from '../datamodel/topologymodel/relationshiptype';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/********************************************************************************************************************
 *
 * RelationshipTypeService implements the calls to the rest interface of the application server and
 * handle the request construction and response extraction for RelationshipTypes
 *
 ********************************************************************************************************************/
@Injectable()
export class RelationshipTypeService {

  // URL of the REST Interface End-Point
  private relationshipTypeUrl = '/api/relationshiptypes';

  constructor(private http: Http) { }

  /******************************************************************************************************************
   *
   * Send GET all RelationshipType REQUEST
   *
   ******************************************************************************************************************/
  public getRelationshipTypes(): Observable<RelationshipType[]> {
    Logger.info('[REQUEST - RELATIONSHIPTYPE] Send GET Relationship Types Request', RelationshipTypeService.name);
    return this.http.get(this.relationshipTypeUrl).map(this.extractRelationshipTypesDataList).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send GET RelationshipType REQUEST
   *
   ******************************************************************************************************************/
  public getRelationshipType(id: number): Observable<RelationshipType> {
    Logger.info('[REQUEST - RELATIONSHIPTYPE] Send GET Relationship Type Request with ID:' + id, RelationshipTypeService.name);
    return this.http.get(this.relationshipTypeUrl + '/' + id).map(this.extractRelationshipTypeData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send POST RelationshipType REQUEST
   *
   ******************************************************************************************************************/
  public createRelationshipType(relationshipType: RelationshipType): Observable<RelationshipType> {
    Logger.info('[REQUEST - RELATIONSHIPTYPE] Send POST RelationshipType Request', RelationshipTypeService.name);
    Logger.data('[REQUEST - RELATIONSHIPTYPE]' + JSON.stringify(relationshipType), RelationshipTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.relationshipTypeUrl, relationshipType, options).map(this.extractRelationshipTypeData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send PUT RelationshipType REQUEST
   *
   ******************************************************************************************************************/
  public updateRelationshipType(relationshipType: RelationshipType): Observable<RelationshipType> {
    Logger.info('[REQUEST - RELATIONSHIPTYPE] Send PUT Request RelationshipType', RelationshipTypeService.name);
    Logger.data('[REQUEST - RELATIONSHIPTYPE] ' + JSON.stringify(relationshipType), RelationshipTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.relationshipTypeUrl + '/' + relationshipType.id, relationshipType, options).map(this.extractRelationshipTypeData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send DELETE RelationshipType REQUEST
   *
   ******************************************************************************************************************/
  public deleteRelationshipType(id: number): Observable<RelationshipType> {
    Logger.info('[REQUEST - RELATIONSHIPTYPE] Send DELETE RelationshipType Request with ID: ' + id, RelationshipTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.relationshipTypeUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Extract data from response data list
   *
   ******************************************************************************************************************/
  public extractRelationshipTypesDataList(res) {
    Logger.info('[RESPONSE - RELATIONSHIPTYPE]: Extract Data of Response Body', RelationshipTypeService.name);
    let body = res.json();
    let relationshipTypeList: RelationshipType[] = [];
    Logger.data('[RESPONSE - RELATIONSHIPTYPE]: ' + JSON.stringify(body), RelationshipTypeService.name);
    for (let relationshipType of body) {
      let tempRelationshipType: RelationshipType = new RelationshipType(relationshipType.name, relationshipType.repository);
      tempRelationshipType.id = relationshipType.id;
      tempRelationshipType.providedProperties = relationshipType.providedProperties;
      relationshipTypeList.push(tempRelationshipType);
    }
    return relationshipTypeList || {};
  }

  /******************************************************************************************************************
   *
   *  Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractRelationshipTypeData(res: Response) {
    Logger.info('[RESPONSE - RELATIONSHIPTYPE]: Extract Data of Response Body', RelationshipTypeService.name);
    let body = res.json();
    Logger.data('[RESPONSE - RELATIONSHIPTYPE]: ' + JSON.stringify(body), RelationshipTypeService.name);
    let relationshipType: RelationshipType = new RelationshipType(body.name, body.repository);
    relationshipType.id = body.id;
    relationshipType.providedProperties = body.providedProperties;
    return relationshipType || {};
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
