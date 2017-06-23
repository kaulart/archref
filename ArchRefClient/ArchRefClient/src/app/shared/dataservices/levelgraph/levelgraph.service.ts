import { Logger } from '../../../../logger/logger';
import { LevelGraph } from '../../datamodels/levelgraph/levelgraph';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - LevelGraphService implements the calls to the rest interface of the application server and
 *            handle the request construction and response extraction for LevelGraph Data
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class LevelGraphService {

  // URL of the REST Interface End-Point
  private levelGraphUrl = '/api/levelgraphs';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getLevelGraphs- Send GET all Level Graphs REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getLevelGraphs(): Observable<LevelGraph[]> {
    Logger.info('[REQUEST - LEVELGRAPH]: Send GET Request Level Graphs', LevelGraphService.name);
    return this.http.get(this.levelGraphUrl).map(this.extractLevelGraphs).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getLevelGraph - Send GET Level Graph REQUEST
   *
   * @param - id: number - ID of the LevelGraph which should be retrieved from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public getLevelGraph(id: number): Observable<LevelGraph> {
    Logger.info('[REQUEST - LEVELGRAPH]: Send GET Request Level Graph with ID: ' + id, LevelGraphService.name);
    return this.http.get(this.levelGraphUrl + '/' + id)
      .map(this.extractLevelGraph)
      .catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - createLevelGraph - Send POST Level Graph REQUEST
   *
   * @param - levelGraph: LevelGraph - LevelGraph which should be created
   *
   *******************************************************************************************************************************************************************************************************/
  public createLevelGraph(levelGraph: LevelGraph): Observable<LevelGraph> {
    Logger.info('[REQUEST - LEVELGRAPH]: Send POST Request Level Graph', LevelGraphService.name);
    Logger.data('[REQUEST - LEVELGRAPH]: ' + JSON.stringify(levelGraph), LevelGraphService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphUrl, levelGraph, options)
      .map(this.extractLevelGraph)
      .catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - updateLevelGraph - Send PUT Level Graph REQUEST
   *
   * @param - levelGraph: LevelGraph - LevelGraphRelation which should be updated
   *
   *******************************************************************************************************************************************************************************************************/
  public updateLevelGraph(levelGraph: LevelGraph): Observable<LevelGraph> {
    Logger.info('[REQUEST - LEVELGRAPH]: Send PUT Request Level Graph', LevelGraphService.name);
    Logger.data('[REQUEST - LEVELGRAPH]: ' + JSON.stringify(levelGraph), LevelGraphService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.levelGraphUrl + '/' + levelGraph.id, levelGraph, options)
      .map(this.extractLevelGraph)
      .catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - deleteLevelGraph - Send DELETE Level Graph REQUEST
   *
   * @param - id: number - ID of the LevelGraph which should be deleted from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteLevelGraph(id: number): Observable<LevelGraph> {
    Logger.info('[REQUEST - LEVELGRAPH]: Send DELETE Request Level Graph', LevelGraphService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.levelGraphUrl + '/' + id, options)
      .map(res => res)
      .catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractLevelGraphs - Extract data from response data list
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  public extractLevelGraphs(res: Response) {
    let body = res.json();
    let levelGraphList: LevelGraph[] = [];
    Logger.info('[RESPONSE - LEVELGRAPH]: Extract Level Graph Data List', LevelGraphService.name);
    Logger.info('[RESPONSE - LEVELGRAPH]: ' + JSON.stringify(body), LevelGraphService.name);
    for (let levelGraph of body) {
      let tempLevelGraph: LevelGraph = new LevelGraph();
      tempLevelGraph = levelGraph;
//      tempLevelGraph.id = levelGraph.id;
//      tempLevelGraph.name = levelGraph.name;
//      tempLevelGraph.levels = levelGraph.levels;
//      tempLevelGraph.levelGraphRelations = levelGraph.levelGraphRelations;
//      tempLevelGraph.levelGraphNodes = levelGraph.levelGraphNodes;
      levelGraphList.push(tempLevelGraph);
    }
    return levelGraphList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractLevelGraph -  Extract data from response data object
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractLevelGraph(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - LEVELGRAPH]: Extract Level Graph Data', LevelGraphService.name);
    Logger.info('[RESPONSE - LEVELGRAPH]: ' + JSON.stringify(body), LevelGraphService.name);
    let levelGraph: LevelGraph = new LevelGraph();
    levelGraph = body;
//    levelGraph.id = body.id;
//    levelGraph.name = body.name;
//    levelGraph.levels = body.levels;
//    levelGraph.levelGraphRelations = body.levelGraphRelations;
//    levelGraph.levelGraphNodes = body.levelGraphNodes;
    return levelGraph || {};
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
