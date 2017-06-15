import { Logger } from '../../../../logger/logger';
import { RelationshipTypeFragment } from '../../datamodels/types/relationshiptypefragment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service RelationshipTypeFragmentService  - Implements the calls to the rest interface of the application server and
 *                                             handle the request construction and response extraction for RelationshipTypeFragment data
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class RelationshipTypeFragmentService {

  // URL of the REST Interface End-Point
  private relationshipTypeFragmentUrl = '/api/relationshiptypefragments';

  constructor(private http: Http) { }

  /*******************************************************************************************************************************************************************************************************
   *
   * @request - Send GET RelationshipType Fragments REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getRelationshipTypeFragments(): Observable<RelationshipTypeFragment[]> {
    Logger.info('[REQUEST - RELATIONSHIPTYPEFRAGMENT] Send GET RelationshipTypeFragment Request', RelationshipTypeFragmentService.name);
    return this.http.get(this.relationshipTypeFragmentUrl).map(this.extractRelationshipTypeFragments).catch(this.handleError);
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @request - Send GET RelationshipType Fragment REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getRelationshipTypeFragment(id: number): Observable<RelationshipTypeFragment> {
    Logger.info('[REQUEST - RELATIONSHIPTYPEFRAGMENT] Send GET RelationshipTypeFragment Request with ID:' + id, RelationshipTypeFragmentService.name);
    return this.http.get(this.relationshipTypeFragmentUrl + '/' + id).map(this.extractRelationshipTypeFragment).catch(this.handleError);
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @request - Send POST RelationshipType Fragment REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public createRelationshipTypeFragment(relationshipTypeFragment: RelationshipTypeFragment): Observable<RelationshipTypeFragment> {
    Logger.info('[REQUEST - RELATIONSHIPTYPEFRAGMENT] Send POST RelationshipTypeFragment Request', RelationshipTypeFragmentService.name);
    Logger.data('[REQUEST - RELATIONSHIPTYPEFRAGMENT]' + JSON.stringify(relationshipTypeFragment), RelationshipTypeFragmentService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.relationshipTypeFragmentUrl, relationshipTypeFragment, options).map(this.extractRelationshipTypeFragment).catch(this.handleError);
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @request - Send PUT RelationshipType Fragment REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public updateRelationshipTypeFragment(relationshipTypeFragment: RelationshipTypeFragment): Observable<RelationshipTypeFragment> {
    Logger.info('[REQUEST - RELATIONSHIPTYPEFRAGMENT] Send PUT RelationshipTypeFragment Request', RelationshipTypeFragmentService.name);
    Logger.data('[REQUEST - RELATIONSHIPTYPEFRAGMENT] ' + JSON.stringify(relationshipTypeFragment), RelationshipTypeFragmentService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.relationshipTypeFragmentUrl + '/' + relationshipTypeFragment.id, relationshipTypeFragment, options).map(this.extractRelationshipTypeFragment).catch(this.handleError);
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @request - Send DELETE RelationshipType Fragment REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteRelationshipType(id: number): Observable<RelationshipTypeFragment> {
    Logger.info('[REQUEST - RELATIONSHIPTYPEFRAGMENT] Send DELETE RelationshipType Request with ID: ' + id, RelationshipTypeFragmentService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.relationshipTypeFragmentUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /*******************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data list
   *
   *******************************************************************************************************************************************************************************************************/
  public extractRelationshipTypeFragments(res) {
    let body = res.json();
    let relationshipTypeFragments: RelationshipTypeFragment[] = [];
    Logger.info('[RESPONSE - RELATIONSHIPTYPEFRAGMENT]: Extract Data of Response Body', RelationshipTypeFragmentService.name);
    Logger.data('[RESPONSE - RELATIONSHIPTYPEFRAGMENT]: ' + JSON.stringify(body), RelationshipTypeFragmentService.name);
    for (let relationshipTypeFragment of body) {
      let tempRelationshipTypeFragment: RelationshipTypeFragment = new RelationshipTypeFragment(relationshipTypeFragment.name);
      tempRelationshipTypeFragment.id = relationshipTypeFragment.id;
      tempRelationshipTypeFragment.providedProperties = relationshipTypeFragment.providedProperties;
      tempRelationshipTypeFragment.expectedProperties = relationshipTypeFragment.providedProperties;
      tempRelationshipTypeFragment.icon = relationshipTypeFragment.icon;
      relationshipTypeFragments.push(relationshipTypeFragment);
    }
    return relationshipTypeFragments || {};
  }

  /*******************************************************************************************************************************************************************************************************
   *
   *  @response - Extract data from response data object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractRelationshipTypeFragment(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - RELATIONSHIPTYPE]: Extract Data of Response Body', RelationshipTypeFragmentService.name);
    Logger.data('[RESPONSE - RELATIONSHIPTYPE]: ' + JSON.stringify(body), RelationshipTypeFragmentService.name);
    let relationshipTypeFragment: RelationshipTypeFragment = new RelationshipTypeFragment(body.name);
    relationshipTypeFragment.id = body.id;
    relationshipTypeFragment.icon = body.icon;
    relationshipTypeFragment.providedProperties = body.providedProperties;
    relationshipTypeFragment.expectedProperties = body.expectedProperties;
    return relationshipTypeFragment || {};
  }

  /*******************************************************************************************************************************************************************************************************
   *
   *  @error - Error Handling
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
