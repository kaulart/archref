import { Logger } from '../../../../logger/logger';
import { RelationshipTypeFragment } from '../../datamodels/types/relationshiptypefragment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - RelationshipTypeFragmentService  - Implements the calls to the rest interface of the application server and
 *                                               handle the request construction and response extraction for RelationshipTypeFragment data
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class RelationshipTypeFragmentService {

  // URL of the REST Interface End-Point
  private relationshipTypeFragmentUrl = '/api/relationshiptypefragments';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getRelationshipTypeFragments - Send GET RelationshipType Fragments REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getRelationshipTypeFragments(): Observable<RelationshipTypeFragment[]> {
    Logger.info('[REQUEST - RELATIONSHIPTYPEFRAGMENT] Send GET RelationshipTypeFragment Request', RelationshipTypeFragmentService.name);
    return this.http.get(this.relationshipTypeFragmentUrl).map(this.extractRelationshipTypeFragments).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getRelationshipTypeFragment - Send GET RelationshipType Fragment REQUEST
   *
   * @param - id: number - ID of the RelationshipTypeFragment which should be retrieved from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public getRelationshipTypeFragment(id: number): Observable<RelationshipTypeFragment> {
    Logger.info('[REQUEST - RELATIONSHIPTYPEFRAGMENT] Send GET RelationshipTypeFragment Request with ID:' + id, RelationshipTypeFragmentService.name);
    return this.http.get(this.relationshipTypeFragmentUrl + '/' + id).map(this.extractRelationshipTypeFragment).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - createRelationshipTypeFragment - Send POST RelationshipType Fragment REQUEST
   *
   * @param - relationshipTypeFragment: RelationshipTypeFragment - RelationshipTypeFragment which should be created
   *
   *******************************************************************************************************************************************************************************************************/
  public createRelationshipTypeFragment(relationshipTypeFragment: RelationshipTypeFragment): Observable<RelationshipTypeFragment> {
    Logger.info('[REQUEST - RELATIONSHIPTYPEFRAGMENT] Send POST RelationshipTypeFragment Request', RelationshipTypeFragmentService.name);
    Logger.data('[REQUEST - RELATIONSHIPTYPEFRAGMENT]' + JSON.stringify(relationshipTypeFragment), RelationshipTypeFragmentService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.relationshipTypeFragmentUrl, relationshipTypeFragment, options).map(this.extractRelationshipTypeFragment).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - updateRelationshipTypeFragment - Send PUT RelationshipType Fragment REQUEST
   *
   * @param - elationshipTypeFragment: RelationshipTypeFragment - RelationshipTypeFragment which should be updated
   *
   *******************************************************************************************************************************************************************************************************/
  public updateRelationshipTypeFragment(relationshipTypeFragment: RelationshipTypeFragment): Observable<RelationshipTypeFragment> {
    Logger.info('[REQUEST - RELATIONSHIPTYPEFRAGMENT] Send PUT RelationshipTypeFragment Request', RelationshipTypeFragmentService.name);
    Logger.data('[REQUEST - RELATIONSHIPTYPEFRAGMENT] ' + JSON.stringify(relationshipTypeFragment), RelationshipTypeFragmentService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.relationshipTypeFragmentUrl + '/' + relationshipTypeFragment.id, relationshipTypeFragment, options).map(this.extractRelationshipTypeFragment).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - deleteRelationshipTypeFragment - Send DELETE RelationshipType Fragment REQUEST
   *
   * @param - id: number - ID of the RelationshipTypeFragment which should be deleted from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteRelationshipTypeFragment(id: number): Observable<RelationshipTypeFragment> {
    Logger.info('[REQUEST - RELATIONSHIPTYPEFRAGMENT] Send DELETE RelationshipType Request with ID: ' + id, RelationshipTypeFragmentService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.relationshipTypeFragmentUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractRelationshipTypeFragments - Extract data from response data list
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  public extractRelationshipTypeFragments(res: Response) {
    let body = res.json();
    let relationshipTypeFragments: RelationshipTypeFragment[] = [];
    Logger.info('[RESPONSE - RELATIONSHIPTYPEFRAGMENT]: Extract Data of Response Body', RelationshipTypeFragmentService.name);
    Logger.data('[RESPONSE - RELATIONSHIPTYPEFRAGMENT]: ' + JSON.stringify(body), RelationshipTypeFragmentService.name);
    for (let relationshipTypeFragment of body) {
      let tempRelationshipTypeFragment: RelationshipTypeFragment = new RelationshipTypeFragment();
      tempRelationshipTypeFragment = relationshipTypeFragment;
      relationshipTypeFragments.push(relationshipTypeFragment);
    }
    return relationshipTypeFragments || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractRelationshipTypeFragment - Extract data from response data object
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractRelationshipTypeFragment(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - RELATIONSHIPTYPE]: Extract Data of Response Body', RelationshipTypeFragmentService.name);
    Logger.data('[RESPONSE - RELATIONSHIPTYPE]: ' + JSON.stringify(body), RelationshipTypeFragmentService.name);
    let relationshipTypeFragment: RelationshipTypeFragment = new RelationshipTypeFragment();
    relationshipTypeFragment = body;
    return relationshipTypeFragment || {};
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
