import { Logger } from '../../../logger/logger';
import { LevelGraph } from '../datamodel/levelgraphmodel/levelgraph';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class LevelGraphService {

  private levelGraphUrl = '/api/levelgraph';

  constructor(private http: Http) { }

  public getLevelGraphs(): Observable<LevelGraph[]> {
    Logger.info('[REQUEST]: Send GET Request Level Graphs', LevelGraphService.name);
    return this.http.get(this.levelGraphUrl)
      .map(this.extractLevelGraphDataList)
      .catch(this.handleError);

  }

  public getLevelGraph(id: number): Observable<LevelGraph> {
    Logger.info('[REQUEST]: Send GET Request Level Graph with ID: ' + id, LevelGraphService.name);
    return this.http.get(this.levelGraphUrl + '/' + id)
      .map(this.extractLevelGraph)
      .catch(this.handleError);
  }

  public createLevelGraph(levelGraph: LevelGraph): Observable<LevelGraph> {
    Logger.info('[REQUEST]: Send POST Request Level Graph', LevelGraphService.name);
    Logger.data('[LEVEL GRAPH]: ' + JSON.stringify(levelGraph), LevelGraphService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphUrl, levelGraph, options)
      .map(this.extractLevelGraph)
      .catch(this.handleError);
  }

  public updateLevelGraph(levelGraph: LevelGraph): Observable<LevelGraph> {
    Logger.info('[REQUEST]: Send PUT Request Level Graph', LevelGraphService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphUrl, levelGraph, options)
      .map(this.extractLevelGraph)
      .catch(this.handleError);
  }

  public deleteLevelGraph(id: number): Observable<LevelGraph> {
    Logger.info('[REQUEST]: Send DELETE Request Level Graph', LevelGraphService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.levelGraphUrl + '/' + id, options)
      .map(res => res)
      .catch(this.handleError);
  }

  public extractLevelGraphDataList(res) {
    Logger.info('Extract Level Graph Data List', LevelGraphService.name);
    let body = res.json();
    let levelGraphList: LevelGraph[] = [];
    Logger.info('[RESPONSE][LEVELGRAPH]: ' + JSON.stringify(body), LevelGraphService.name);
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

  private extractLevelGraph(res: Response) {
     Logger.info('Extract Level Graph Data', LevelGraphService.name);
    let body = res.json();
    Logger.info('[RESPONSE][LEVELGRAPH]: ' + JSON.stringify(body), LevelGraphService.name);
    let levelGraph: LevelGraph = new LevelGraph(body.name, body.numberOfLevels);
    levelGraph.levels = body.levels;
    levelGraph.levelGraphNodes = body.levelGraphNodes;
      levelGraph.levelGraphRelations = body.levelGraphRelations;
    levelGraph.id = body.id;
    return levelGraph || {};
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
