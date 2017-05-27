import { Logger } from '../../../logger/logger';
import { LevelGraph } from '../datamodel/levelgraphmodel/levelgraph';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs';

/********************************************************************************************************************
 *
 * LevelGraph Service implements the calls to the rest interface of the application server and
 * handle the request construction and response extraction for Level Graphs
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
    return this.http.get(this.levelGraphUrl).map(this.extractLevelGraphDataList).catch(this.handleError);
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
   * Send POST Repository REQUEST
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
   * Send PUT Repository REQUEST
   *
   ******************************************************************************************************************/
  public updateLevelGraph(levelGraph: LevelGraph): Observable<LevelGraph> {
    Logger.info('[REQUEST - LEVELGRAPH]: Send PUT Request Level Graph', LevelGraphService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.levelGraphUrl + '/' + levelGraph.id, levelGraph, options)
      .map(this.extractLevelGraph)
      .catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send DELETE Repository REQUEST
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
  public extractLevelGraphDataList(res) {
    Logger.info('[REQUEST - LEVELGRAPH]: Extract Level Graph Data List', LevelGraphService.name);
    let body = res.json();
    let levelGraphList: LevelGraph[] = [];
    Logger.info('[REQUEST - LEVELGRAPH]: ' + JSON.stringify(body), LevelGraphService.name);
    for (let levelGraph of body) {
      let tempLevelGraph: LevelGraph = new LevelGraph(levelGraph.name, levelGraph.numberOfLevels);
      tempLevelGraph.levels = levelGraph.levels;
      tempLevelGraph.levelGraphNodes = levelGraph.levelGraphNodes;
      tempLevelGraph.levelGraphRelations = levelGraph.levelGraphRelations;
      tempLevelGraph.id = levelGraph.id;
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
    Logger.info('[REQUEST - LEVELGRAPH]: Extract Level Graph Data', LevelGraphService.name);
    let body = res.json();
    Logger.info('[REQUEST - LEVELGRAPH]: ' + JSON.stringify(body), LevelGraphService.name);
    let levelGraph: LevelGraph = new LevelGraph(body.name, body.numberOfLevels);
    levelGraph.levels = body.levels;
    levelGraph.levelGraphNodes = body.levelGraphNodes;
    levelGraph.levelGraphRelations = body.levelGraphRelations;
    levelGraph.id = body.id;
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

