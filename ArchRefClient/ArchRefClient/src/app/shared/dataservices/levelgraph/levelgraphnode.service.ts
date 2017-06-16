import { Logger } from '../../../../logger/logger';
import { LevelGraphNode } from '../../datamodels/levelgraph/levelgraphnode';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - LevelGraphNodeService implements the calls to the rest interface of the application server and
 *            handle the request construction and response extraction for LevelGraphNodes
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class LevelGraphNodeService {

  // URL of the REST Interface End-Point
  private levelGraphNodeUrl = '/api/levelgraphnodes';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET all Level Graph Nodes REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getLevelGraphNodes(): Observable<LevelGraphNode[]> {
    Logger.info('[REQUEST - LEVELGRAPHNODE]: Send GET Level Graph Nodes Request', LevelGraphNodeService.name);
    return this.http.get(this.levelGraphNodeUrl).map(this.extractLevelGraphNodes).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET Level Graph Node REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getLevelGraphNode(id: number): Observable<LevelGraphNode> {
    Logger.info('[REQUEST - LEVELGRAPHNODE]: Send GET Level Graph Node Request with ID: ' + id, LevelGraphNodeService.name);
    return this.http.get(this.levelGraphNodeUrl + '/' + id).map(this.extractLevelGraphNode).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send POST Level Graph Node REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public createLevelGraphNode(levelGraphNode: LevelGraphNode): Observable<LevelGraphNode> {
    Logger.info('[REQUEST - LEVELGRAPHNODE]: Send POST Level Graph Node Request', LevelGraphNodeService.name);
    Logger.data('[REQUEST - LEVELGRAPHNODE]: ' + JSON.stringify(levelGraphNode), LevelGraphNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphNodeUrl, levelGraphNode, options).map(this.extractLevelGraphNode).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send PUT Level Graph Node REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public updateLevelGraphNode(levelGraphNode: LevelGraphNode): Observable<LevelGraphNode> {
    Logger.info('[REQUEST - LEVELGRAPHNODE]: Send PUT Level Graph Node Request', LevelGraphNodeService.name);
    Logger.data('[REQUEST - LEVELGRAPHNODE]: ' + JSON.stringify(levelGraphNode), LevelGraphNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.levelGraphNodeUrl + '/' + levelGraphNode.id, levelGraphNode, options).map(this.extractLevelGraphNode).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send DELETE Level Graph Node  REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteLevelGraphNode(id: number): Observable<LevelGraphNode> {
    Logger.info('[REQUEST - LEVELGRAPHNODE]: Send DELETE Level Graph Node Request', LevelGraphNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.levelGraphNodeUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data list
   *
   *******************************************************************************************************************************************************************************************************/
  public extractLevelGraphNodes(res) {
    let body = res.json();
    let levelGraphList: LevelGraphNode[] = [];
    Logger.info('[RESPONSE - LEVELGRAPHNODE]: Extract Level Graph Node Data List', LevelGraphNodeService.name);
    Logger.info('[RESPONSE - LEVELGRAPHNODE]: ' + JSON.stringify(body), LevelGraphNodeService.name);
    for (let levelGraphNode of body) {
      let tempLevelGraphNode: LevelGraphNode = new LevelGraphNode(levelGraphNode.x, levelGraphNode.y, levelGraphNode.width, levelGraphNode.height, levelGraphNode.levelId, levelGraphNode.levelGraphNodeType, levelGraphNode.levelGraphNodeTypeId, levelGraphNode.levelGraphId);
      levelGraphNode.name = levelGraphNode.name;
      tempLevelGraphNode.levelGraphRelations = levelGraphNode.levelGraphRelations;
      tempLevelGraphNode.id = levelGraphNode.id;
      tempLevelGraphNode.level = levelGraphNode.level;
      tempLevelGraphNode.levelGraph = levelGraphNode.levelGraph;
      levelGraphList.push(tempLevelGraphNode);
    }
    return levelGraphList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractLevelGraphNode(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - LEVELGRAPHNODE]: Extract Level Graph Node Data', LevelGraphNodeService.name);
    Logger.info('[RESPONSE - LEVELGRAPHNODE]: ' + JSON.stringify(body), LevelGraphNodeService.name);
    let levelGraphNode: LevelGraphNode = new LevelGraphNode(body.x, body.y, body.width, body.height, body.levelId, body.levelGraphNodeType, body.levelGraphNodeTypeId, body.levelGraphId);
      levelGraphNode.levelGraphRelations = body.levelGraphRelations;
      levelGraphNode.name = body.name;
      levelGraphNode.id = body.id;
      levelGraphNode.level = body.level;
      levelGraphNode.levelGraph = body.levelGraph;
    return levelGraphNode || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @error - Error Handling
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
