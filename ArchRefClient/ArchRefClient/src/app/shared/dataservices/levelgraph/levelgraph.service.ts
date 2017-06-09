import { Logger } from '../../../../logger/logger';
import { LevelGraph } from '../../datamodels/levelgraph/levelgraph';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs';

/********************************************************************************************************************
 *
 * LevelGraph Service implements the calls to the rest interface of the application server and
 * handle the request construction and response extraction for Level Graph Data
 *
 ********************************************************************************************************************/
@Injectable()
export class LevelGraphService {

  // URL of the REST Interface End-Point
  private levelGraphUrl = '/api/levelgraphs';

  constructor(private http: Http) { }

  /******************************************************************************************************************
   *
   * Send GET all Level Graphs REQUEST
   *
   ******************************************************************************************************************/
  public getLevelGraphs(): Observable<LevelGraph[]> {
    Logger.info('[REQUEST - LEVELGRAPH]: Send GET Request Level Graphs', LevelGraphService.name);
    return this.http.get(this.levelGraphUrl).map(this.extractLevelGraphs).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send GET Level Graph REQUEST
   *
   ******************************************************************************************************************/
  public getLevelGraph(id: number): Observable<LevelGraph> {
    Logger.info('[REQUEST - LEVELGRAPH]: Send GET Request Level Graph with ID: ' + id, LevelGraphService.name);
    return this.http.get(this.levelGraphUrl + '/' + id)
      .map(this.extractLevelGraph)
      .catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send POST Level Graph REQUEST
   *
   ******************************************************************************************************************/
  public createLevelGraph(levelGraph: LevelGraph): Observable<LevelGraph> {
    Logger.info('[REQUEST - LEVELGRAPH]: Send POST Request Level Graph', LevelGraphService.name);
    Logger.data('[REQUEST - LEVELGRAPH]: ' + JSON.stringify(levelGraph), LevelGraphService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphUrl, levelGraph, options)
      .map(this.extractLevelGraph)
      .catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send PUT Level Graph REQUEST
   *
   ******************************************************************************************************************/
  public updateLevelGraph(levelGraph: LevelGraph): Observable<LevelGraph> {
    Logger.info('[REQUEST - LEVELGRAPH]: Send PUT Request Level Graph', LevelGraphService.name);
    Logger.data('[REQUEST - LEVELGRAPH]: ' + JSON.stringify(levelGraph), LevelGraphService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.levelGraphUrl + '/' + levelGraph.getId(), levelGraph, options)
      .map(this.extractLevelGraph)
      .catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send DELETE Level Graph REQUEST
   *
   ******************************************************************************************************************/
  public deleteLevelGraph(id: number): Observable<LevelGraph> {
    Logger.info('[REQUEST - LEVELGRAPH]: Send DELETE Request Level Graph', LevelGraphService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.levelGraphUrl + '/' + id, options)
      .map(res => res)
      .catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Extract data from response data list
   *
   ******************************************************************************************************************/
  public extractLevelGraphs(res) {
    let body = res.json();
    let levelGraphList: LevelGraph[] = [];
    Logger.info('[RESPONSE - LEVELGRAPH]: Extract Level Graph Data List', LevelGraphService.name);
    Logger.info('[RESPONSE - LEVELGRAPH]: ' + JSON.stringify(body), LevelGraphService.name);
    for (let levelGraph of body) {
      let tempLevelGraph: LevelGraph = new LevelGraph();
      tempLevelGraph.setId(levelGraph.id);
      tempLevelGraph.setName(levelGraph.name);
      tempLevelGraph.setLevels(levelGraph.levels);
      tempLevelGraph.setLevelGraphRelations(levelGraph.levelGraphRelations);
      tempLevelGraph.setLevelGraphNodes(levelGraph.levelGraphNodes);
      levelGraphList.push(tempLevelGraph);
    }
    return levelGraphList || {};
  }

  /******************************************************************************************************************
   *
   *  Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractLevelGraph(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - LEVELGRAPH]: Extract Level Graph Data', LevelGraphService.name);
    Logger.info('[RESPONSE - LEVELGRAPH]: ' + JSON.stringify(body), LevelGraphService.name);
    let levelGraph: LevelGraph = new LevelGraph();
    levelGraph.setId(body.id);
    levelGraph.setName(body.name);
    levelGraph.setLevels(body.levels);
    levelGraph.setLevelGraphRelations(body.levelGraphRelations);
    levelGraph.setLevelGraphNodes(body.levelGraphNodes);
    return levelGraph || {};
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
