import { Logger } from '../../../logger/logger';
import { LevelGraphNode } from '../datamodel/levelgraphmodel/levelgraphnode';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class LevelGraphNodeService {

  private levelGraphNodeUrl = '/api/levelgraphnode';

  constructor(private http: Http) { }

  public getLevelGraphNodes(): Observable<LevelGraphNode[]> {
    Logger.info('[REQUEST]: Send GET Request Level Graph Nodes', LevelGraphNodeService.name);
    return this.http.get(this.levelGraphNodeUrl)
      .map(this.extractLevelGraphNodeDataList)
      .catch(this.handleError);

  }

  public getLevelGraphNode(id: number): Observable<LevelGraphNode> {
    Logger.info('[REQUEST]: Send GET Request Level Graph Node with ID: ' + id, LevelGraphNodeService.name);
    return this.http.get(this.levelGraphNodeUrl + '/' + id)
      .map(this.extractLevelGraphNode)
      .catch(this.handleError);
  }

  public createLevelGraphNode(levelGraphNode: LevelGraphNode): Observable<LevelGraphNode> {
    Logger.info('[REQUEST]: Send POST Request Level Graph Node', LevelGraphNodeService.name);
    Logger.data('[LEVEL GRAPH NODE ]: ' + JSON.stringify(levelGraphNode), LevelGraphNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphNodeUrl, levelGraphNode, options)
      .map(this.extractLevelGraphNode)
      .catch(this.handleError);
  }

  public updateLevelGraphNode(levelGraphNode: LevelGraphNode): Observable<LevelGraphNode> {
    Logger.info('[REQUEST]: Send PUT Request Level Graph Node', LevelGraphNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphNodeUrl, levelGraphNode, options)
      .map(this.extractLevelGraphNode)
      .catch(this.handleError);
  }

  public deleteLevelGraphNode(id: number): Observable<LevelGraphNode> {
    Logger.info('[REQUEST]: Send DELETE Request Level Graph Node', LevelGraphNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.levelGraphNodeUrl + '/' + id, options)
      .map(res => res)
      .catch(this.handleError);
  }

  public extractLevelGraphNodeDataList(res) {
    Logger.info('Extract Level Graph Node Data List', LevelGraphNodeService.name);
    let body = res.json();
    let levelGraphList: LevelGraphNode[] = [];
    Logger.info('[RESPONSE][LEVELGRAPHNODE]: ' + JSON.stringify(body), LevelGraphNodeService.name);
    for (let levelGraphNode of body) {
      let tempLevelGraphNode: LevelGraphNode = new LevelGraphNode(levelGraphNode.x, levelGraphNode.y, levelGraphNode.width, levelGraphNode.height, levelGraphNode.levelId, levelGraphNode.levelGraphNodeType, levelGraphNode.typeRef, levelGraphNode.levelGraph);
       tempLevelGraphNode.inLevelGraphRelations = levelGraphNode.inLevelGraphRelations;
    tempLevelGraphNode.outLevelGraphRelations = levelGraphNode.outLevelGraphRelations;
      tempLevelGraphNode.id = levelGraphNode.id;
      levelGraphList.push(tempLevelGraphNode);

    }

    return levelGraphList || {};

  }

  private extractLevelGraphNode(res: Response) {
    Logger.info('Extract Level Graph Data', LevelGraphNodeService.name);
    let body = res.json();
    Logger.info('[RESPONSE][LEVELGRAPHNODE]: ' + JSON.stringify(body), LevelGraphNodeService.name);
    let levelGraphNode: LevelGraphNode = new LevelGraphNode(body.x, body.y, body.width, body.height, body.levelId, body.levelGraphNodeType, body.typeRef, body.levelGraph);
    levelGraphNode.inLevelGraphRelations = body.inLevelGraphRelations;
    levelGraphNode.outLevelGraphRelations = body.outLevelGraphRelations;
    levelGraphNode.id = body.id;
    return levelGraphNode || {};
  }

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
