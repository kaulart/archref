
import { Logger } from '../../../logger/logger';
import { NodeType } from '../datamodel/topologymodel/nodetype';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/********************************************************************************************************************
 *
 * NodeType Service implements the calls to the rest interface of the application server and
 * handle the request construction and response extraction for Node Types
 *
 ********************************************************************************************************************/
@Injectable()
export class NodeTypeService {

  // URL of the REST Interface End-Point
  private nodetypeUrl = '/api/nodetypes';

  constructor(private http: Http) { }

  /******************************************************************************************************************
   *
   * Send GET all NodeTypes REQUEST
   *
   ******************************************************************************************************************/
  public getNodeTypes(): Observable<NodeType[]> {
    Logger.info('[REQUEST - NODETYPE] Send GET Node Types Request', NodeTypeService.name);
    return this.http.get(this.nodetypeUrl).map(this.extractNodeTypesDataList).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send POST NodeType REQUEST
   *
   ******************************************************************************************************************/
  public createNodeType(nodeType: NodeType): Observable<NodeType> {
    Logger.info('[REQUEST - NODETYPE] Send POST Node Type Request', NodeTypeService.name);
    Logger.data('[REQUEST - NODETYPE]' + JSON.stringify(nodeType), NodeTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.nodetypeUrl, nodeType, options).map(this.extractNodeTypesData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send PUT Repository REQUEST
   *
   ******************************************************************************************************************/
  public updateNodeType(nodeType: NodeType): Observable<NodeType> {
    Logger.info('[REQUEST - NODETYPE] Send PUT Request NodeType', NodeTypeService.name);
    Logger.data('[REQUEST - NODETYPE] ' + JSON.stringify(nodeType), NodeTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.nodetypeUrl + '/' + nodeType.id, nodeType, options).map(this.extractNodeTypesData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send DELETE Repository REQUEST
   *
   ******************************************************************************************************************/
  public deleteNodeType(id: number): Observable<NodeType> {
    Logger.info('[REQUEST - NODETYPE] Send DELETE NodeType Request with ID: ' + id, NodeTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.nodetypeUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Extract data from response data list
   *
   ******************************************************************************************************************/
  public extractNodeTypesDataList(res) {
    Logger.info('[RESPONSE - NODETYPE]: Extract Data of Response Body', NodeTypeService.name);
    let body = res.json();
    let nodeTypeList: NodeType[] = [];
    Logger.data('[RESPONSE - NODETYPE]: ' + JSON.stringify(body), NodeTypeService.name);
    for (let nodeType of body) {
      let tempNodeType: NodeType = new NodeType(nodeType.name, nodeType.repositoryId);
      tempNodeType.id = nodeType.id;
      nodeTypeList.push(tempNodeType);
    }
    return nodeTypeList || {};
  }

  /******************************************************************************************************************
   *
   *  Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractNodeTypesData(res: Response) {
    Logger.info('[RESPONSE - NODETYPE]: Extract Data of Response Body', NodeTypeService.name);
    let body = res.json();
    Logger.data('[RESPONSE - NODETYPE]: ' + JSON.stringify(body), NodeTypeService.name);
    let nodeType: NodeType = new NodeType(body.name, body.repositoryId);
    nodeType.id = body.id;
    return nodeType || {};
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
