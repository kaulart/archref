import { Logger } from '../../../../logger/logger';
import { NodeTypeFragment } from '../../datamodels/types/nodetypefragment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - NodetypefragmentService implements the calls to the rest interface of the application server and
 *            handle the request construction and response extraction for NodeTypeFragments
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class NodeTypeFragmentService {

  // URL of the REST Interface End-Point
  private nodeTypeFragmentUrl = '/api/nodetypefragments';

  constructor(private http: Http) { }

  /*******************************************************************************************************************************************************************************************************
   *
   * @request - Send GET all NodeTypeFragment REQUEST
   *
   ******************************************************************************************************************/
  public getNodeTypeFragments(): Observable<NodeTypeFragment[]> {
    Logger.info('[REQUEST - NODETYPEFRAGMENT] Send GET NodeTypeFragment Request', NodeTypeFragmentService.name);
    return this.http.get(this.nodeTypeFragmentUrl).map(this.extractNodeTypeFragments).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send GET NodeTypeFragment REQUEST
   *
   ******************************************************************************************************************/
  public getNodeTypeFragment(id: number): Observable<NodeTypeFragment> {
    Logger.info('[REQUEST - NODETYPEFRAGMENT] Send GET NodeTypeFragment Request with ID:' + id, NodeTypeFragmentService.name);
    return this.http.get(this.nodeTypeFragmentUrl + '/' + id).map(this.extractNodeTypeFragment).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send POST NodeTypeFragment REQUEST
   *
   ******************************************************************************************************************/
  public createNodeTypeFragment(nodeTypeFragment: NodeTypeFragment): Observable<NodeTypeFragment> {
    Logger.info('[REQUEST - NODETYPEFRAGMENT] Send POST NodeTypeFragment Request', NodeTypeFragmentService.name);
    Logger.data('[REQUEST - NODETYPEFRAGMENT]' + JSON.stringify(nodeTypeFragment), NodeTypeFragmentService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.nodeTypeFragmentUrl, nodeTypeFragment, options).map(this.extractNodeTypeFragment).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send PUT NodeTypeFragment REQUEST
   *
   ******************************************************************************************************************/
  public updateNodeTypeFragment(nodeTypeFragment: NodeTypeFragment): Observable<NodeTypeFragment> {
    Logger.info('[REQUEST - NODETYPEFRAGMENT] Send PUT NodeTypeFragment Request', NodeTypeFragmentService.name);
    Logger.data('[REQUEST - NODETYPEFRAGMENT] ' + JSON.stringify(nodeTypeFragment), NodeTypeFragmentService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.nodeTypeFragmentUrl + '/' + nodeTypeFragment.id, nodeTypeFragment, options).map(this.extractNodeTypeFragment).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send DELETE NodeTypeFragment REQUEST
   *
   ******************************************************************************************************************/
  public deleteNodeTypeFragment(id: number): Observable<NodeTypeFragment> {
    Logger.info('[REQUEST - NODETYPEFRAGMENT] Send DELETE NodeTypeFragment Request with ID: ' + id, NodeTypeFragmentService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.nodeTypeFragmentUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @response - Extract data from response data list
   *
   ******************************************************************************************************************/
  public extractNodeTypeFragments(res) {
    let body = res.json();
    let nodeTypeFragments: NodeTypeFragment[] = [];
    Logger.info('[RESPONSE - NODETYPEFRAGMENT]: Extract Data of Response Body', NodeTypeFragmentService.name);
    Logger.data('[RESPONSE - NODETYPEFRAGMENT]: ' + JSON.stringify(body), NodeTypeFragmentService.name);
    for (let nodeTypeFragment of body) {
      let tempNodeTypeFragment: NodeTypeFragment = new NodeTypeFragment(nodeTypeFragment.name);
      tempNodeTypeFragment.id = nodeTypeFragment.id;
      tempNodeTypeFragment.icon = nodeTypeFragment.icon;
      tempNodeTypeFragment.providedProperties = nodeTypeFragment.providedProperties;
      tempNodeTypeFragment.expectedProperties = nodeTypeFragment.expectedProperties;
      nodeTypeFragments.push(tempNodeTypeFragment);
    }
    return nodeTypeFragments || {};
  }

  /******************************************************************************************************************
   *
   * @response - Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractNodeTypeFragment(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - NODETYPEFRAGMENT]: Extract Data of Response Body', NodeTypeFragmentService.name);
    Logger.data('[RESPONSE - NODETYPEFRAGMENT]: ' + JSON.stringify(body), NodeTypeFragmentService.name);
    let nodeTypeFragment: NodeTypeFragment = new NodeTypeFragment(body.name);
    nodeTypeFragment.id = body.id;
    nodeTypeFragment.icon = body.icon;
    nodeTypeFragment.providedProperties = body.providedProperties;
    nodeTypeFragment.expectedProperties = body.expectedProperties;
    return nodeTypeFragment || {};
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
