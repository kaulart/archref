import { Logger } from '../../../../logger/logger';
import { NodeType } from '../../datamodels/types/nodetype';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - NodeTypeService implements the calls to the rest interface of the application server and
 *            handle the request construction and response extraction for Node Types
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class NodeTypeService {

  // URL of the REST Interface End-Point
  private nodetypeUrl = '/api/nodetypes';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getNodeTypes - Send GET all NodeTypes REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getNodeTypes(): Observable<NodeType[]> {
    Logger.info('[REQUEST - NODETYPE] Send GET Node Types Request', NodeTypeService.name);
    return this.http.get(this.nodetypeUrl).map(this.extractNodeTypes).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getNodeType - Send GET NodeType REQUEST
   *
   * @param - id: number - ID of the NodeType which should be retrieved from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public getNodeType(id: number): Observable<NodeType> {
    Logger.info('[REQUEST - NODETYPE] Send GET Node Type Request with ID:' + id, NodeTypeService.name);
    return this.http.get(this.nodetypeUrl + '/' + id).map(this.extractNodeType).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - createNodeType - Send POST NodeType REQUEST
   *
   * @param - nodeType: NodeType - NodeType which should be created
   *
   *******************************************************************************************************************************************************************************************************/
  public createNodeType(nodeType: NodeType): Observable<NodeType> {
    Logger.info('[REQUEST - NODETYPE] Send POST Node Type Request', NodeTypeService.name);
    Logger.data('[REQUEST - NODETYPE]' + JSON.stringify(nodeType), NodeTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.nodetypeUrl, nodeType, options).map(this.extractNodeType).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - updateNodeType - Send PUT NodeType REQUEST
   *
   * @param - nodeType: NodeType - NodeType which should be updated
   *
   *******************************************************************************************************************************************************************************************************/
  public updateNodeType(nodeType: NodeType): Observable<NodeType> {
    Logger.info('[REQUEST - NODETYPE] Send PUT NodeType Request', NodeTypeService.name);
    Logger.data('[REQUEST - NODETYPE] ' + JSON.stringify(nodeType), NodeTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.nodetypeUrl + '/' + nodeType.id, nodeType, options).map(this.extractNodeType).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send DELETE NodeType REQUEST
   *
   * @param - id: number - ID of the NodeType which should be deleted from the database
   *
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteNodeType(id: number): Observable<NodeType> {
    Logger.info('[REQUEST - NODETYPE] Send DELETE NodeType Request with ID: ' + id, NodeTypeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.nodetypeUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractNodeTypes - Extract data from response data list
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  public extractNodeTypes(res: Response) {
    let body = res.json();
    let nodeTypeList: NodeType[] = [];
    Logger.info('[RESPONSE - NODETYPE]: Extract Data of Response Body', NodeTypeService.name);
    Logger.data('[RESPONSE - NODETYPE]: ' + JSON.stringify(body), NodeTypeService.name);
    for (let nodeType of body) {
      let tempNodeType: NodeType = new NodeType();
      tempNodeType = nodeType;
      nodeTypeList.push(tempNodeType);
    }
    return nodeTypeList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractNodeTypes - Extract data from response data object
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractNodeType(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - NODETYPE]: Extract Data of Response Body', NodeTypeService.name);
    Logger.data('[RESPONSE - NODETYPE]: ' + JSON.stringify(body), NodeTypeService.name);
    let nodeType: NodeType = new NodeType();
    nodeType = body;
    return nodeType || {};
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
