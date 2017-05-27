import { Logger } from '../../../logger/logger';
import { FragmentNode } from '../datamodel/levelgraphmodel/fragmentnode';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

/********************************************************************************************************************
 *
 * FragmentNode Service implements the calls to the rest interface of the application server and
 * handle the request construction and response extraction for FragmentNodes
 *
 ********************************************************************************************************************/
@Injectable()
export class FragmentNodeService {

  // URL of the REST Interface End-Point
  private fragmentnodesUrl = '/api/fragmentnodes';

  constructor(private http: Http) { }

  /******************************************************************************************************************
   *
   * Send GET all FragmentNodes REQUEST
   *
   ******************************************************************************************************************/
  public getFragmentNodes(): Observable<FragmentNode[]> {
    Logger.info('[REQUEST - FRAGMENTNODE]: Send GET FragmentNodes Request', FragmentNodeService.name);
    return this.http.get(this.fragmentnodesUrl).map(this.extractFragmentNodeDataList).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send GET FragmentNode REQUEST
   *
   ******************************************************************************************************************/
  public getFragmentNode(id: number): Observable<FragmentNode> {
    Logger.info('[REQUEST - FRAGMENTNODE]: Send GET FragmentNode Request with ID:' + id, FragmentNodeService.name);
    return this.http.get(this.fragmentnodesUrl + '/' + id).map(this.extractFragmentNodeData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send POST FragmentNode REQUEST
   *
   ******************************************************************************************************************/
  public createFragmentNode(fragmentNode: FragmentNode): Observable<FragmentNode> {
    Logger.info('[REQUEST - FRAGMENTNODE]: Send POST FragmentNode Request', FragmentNodeService.name);
    Logger.data(JSON.stringify(fragmentNode), FragmentNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.fragmentnodesUrl, fragmentNode, options).map(this.extractFragmentNodeData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send PUT FragmentNode REQUEST
   *
   ******************************************************************************************************************/
  public updateFragmentNode(fragmentNode: FragmentNode): Observable<FragmentNode> {
    Logger.info('[REQUEST - FRAGMENTNODE]: Send PUT Request FragmentNode', FragmentNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.fragmentnodesUrl, fragmentNode, options).map(this.extractFragmentNodeData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send DELETE FragmentNode REQUEST
   *
   ******************************************************************************************************************/
  public deleteFragmentNode(id: number): Observable<FragmentNode> {
    Logger.info('[REQUEST - FRAGMENTNODE]: Send DELETE Repository Request with ID: ' + id, FragmentNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.fragmentnodesUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Extract data from response data list
   *
   ******************************************************************************************************************/
  private extractFragmentNodeDataList(res: Response) {
    Logger.info('[RESPONSE - FRAGMENTNODE]: Extract Data of Response Body', FragmentNodeService.name);
    let body = res.json();
    let fragmetnNodesList: FragmentNode[] = [];
    Logger.data('[RESPONSE - FRAGMENTNODE]: ' + JSON.stringify(body), FragmentNodeService.name);
    for (let fragmentNode of body) {
      let tempFragmentNode: FragmentNode = new FragmentNode();
      tempFragmentNode.setId(fragmentNode.id);
      fragmetnNodesList.push(tempFragmentNode);
    }
    return fragmetnNodesList || {};
  }

  /******************************************************************************************************************
   *
   *  Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractFragmentNodeData(res: Response) {
    Logger.info('Extract Data of Response Body', FragmentNodeService.name);
    let body = res.json();
    Logger.data('[RESPONSE][FragmetnNode]: ' + JSON.stringify(body), FragmentNodeService.name);
    let fragmentNode: FragmentNode = new FragmentNode();
    fragmentNode.setId(body.id);
    return fragmentNode || {};
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
