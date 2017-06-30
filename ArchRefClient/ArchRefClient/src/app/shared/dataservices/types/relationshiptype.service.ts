import { Logger } from '../../../../logger/logger';
import { RelationshipType } from '../../datamodels/types/relationshiptype';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - RelationshipTypeService implements the calls to the rest interface of the application server and
 *            handle the request construction and response extraction for RelationshipTypes
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class RelationshipTypeService {

  // URL of the REST Interface End-Point
  private relationshipTypeUrl = '/api/relationshiptypes';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getRelationshipTypes - Send GET all RelationshipType REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getRelationshipTypes(): Observable<RelationshipType[]> {
    Logger.info('[REQUEST - RELATIONSHIPTYPE] Send GET Relationship Types Request', RelationshipTypeService.name);
    return this.http.get(this.relationshipTypeUrl).map(this.extractRelationshipTypes).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getRelationshipType - Send GET RelationshipType REQUEST
   *
   * @param - id: number - ID of the RelationshipType which should be retrieved from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public getRelationshipType(id: number): Observable<RelationshipType> {
    Logger.info('[REQUEST - RELATIONSHIPTYPE] Send GET Relationship Type Request with ID:' + id, RelationshipTypeService.name);
    return this.http.get(this.relationshipTypeUrl + '/' + id).map(this.extractRelationshipType).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - createRelationshipType - Send POST RelationshipType REQUEST
   *
   * @param - relationshipType: RelationshipType - RelationshipType which should be created
   *
   *******************************************************************************************************************************************************************************************************/
  public createRelationshipType(relationshipType: RelationshipType): Observable<RelationshipType> {
    Logger.info('[REQUEST - RELATIONSHIPTYPE] Send POST RelationshipType Request', RelationshipTypeService.name);
    Logger.data('[REQUEST - RELATIONSHIPTYPE]' + JSON.stringify(relationshipType), RelationshipTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.relationshipTypeUrl, relationshipType, options).map(this.extractRelationshipType).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - updateRelationshipType - Send PUT RelationshipType REQUEST´
   *
   * @param - relationshipType: RelationshipType - RelationshipType which should be updated
   *
   *******************************************************************************************************************************************************************************************************/
  public updateRelationshipType(relationshipType: RelationshipType): Observable<RelationshipType> {
    Logger.info('[REQUEST - RELATIONSHIPTYPE] Send PUT RelationshipType Request', RelationshipTypeService.name);
    Logger.data('[REQUEST - RELATIONSHIPTYPE] ' + JSON.stringify(relationshipType), RelationshipTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.relationshipTypeUrl + '/' + relationshipType.id, relationshipType, options).map(this.extractRelationshipType).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - deleteRelationshipType - Send DELETE RelationshipType REQUEST
   *
   * @param - id: number - ID of the RelationshipType which should be deleted from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteRelationshipType(id: number): Observable<RelationshipType> {
    Logger.info('[REQUEST - RELATIONSHIPTYPE] Send DELETE RelationshipType Request with ID: ' + id, RelationshipTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.relationshipTypeUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractRelationshipTypes - Extract data from response data list
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  public extractRelationshipTypes(res: Response) {
    Logger.info('[RESPONSE - RELATIONSHIPTYPE]: Extract Data of Response Body', RelationshipTypeService.name);
    let body = res.json();
    let relationshipTypeList: RelationshipType[] = [];
    Logger.data('[RESPONSE - RELATIONSHIPTYPE]: ' + JSON.stringify(body), RelationshipTypeService.name);
    for (let relationshipType of body) {
      let tempRelationshipType: RelationshipType = new RelationshipType();
      tempRelationshipType = relationshipType;
      relationshipTypeList.push(tempRelationshipType);
    }
    return relationshipTypeList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractRelationshipType - Extract data from response data object
   *
   * @param - error: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractRelationshipType(res: Response) {
    Logger.info('[RESPONSE - RELATIONSHIPTYPE]: Extract Data of Response Body', RelationshipTypeService.name);
    let body = res.json();
    Logger.data('[RESPONSE - RELATIONSHIPTYPE]: ' + JSON.stringify(body), RelationshipTypeService.name);
    let relationshipType: RelationshipType = new RelationshipType();
    relationshipType = body;
    return relationshipType || {};
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
