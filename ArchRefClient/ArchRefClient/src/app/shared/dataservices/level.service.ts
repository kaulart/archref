
import { Logger } from '../../../logger/logger';
import { Level } from '../datamodel/levelgraphmodel/level';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class LevelService {

  private levelUrl = '/api/level';

  constructor(private http: Http) { }

//  public getLevels(): Observable<Level[]> {
//    Logger.info('[REQUEST]: Send GET Request Level Graphs', LevelGraphService.name);
//    return this.http.get(this.levelUrl)
//      .map(this.extractLevelGraphDataList)
//      .catch(this.handleError);
//
//  }

//  public getLevelGraph(id: number): Observable<LevelGraph> {
//    Logger.info('[REQUEST]: Send GET Request Level Graph with ID: ' + id, LevelGraphService.name);
//    return this.http.get(this.levelUrl + '/' + id)
//      .map(this.extractLevelGraph)
//      .catch(this.handleError);
//  }

  public createLevel(level: Level): Observable<Level> {
    Logger.info('[REQUEST]: Send POST Request Level', LevelService.name);
    Logger.data('[LEVEL]: ' + JSON.stringify(level), LevelService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelUrl, level, options)
      .map(this.extractLevel)
      .catch(this.handleError);
  }

  public updateLevel(level: Level): Observable<Level> {
    Logger.info('[REQUEST]: Send PUT Request Level', LevelService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelUrl, level, options)
      .map(this.extractLevel)
      .catch(this.handleError);
  }

  public deleteLevel(id: number): Observable<Level> {
    Logger.info('[REQUEST]: Send DELETE Request Level', LevelService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.levelUrl + '/' + id, options)
      .map(res => res)
      .catch(this.handleError);
  }

  public extractLevelDataList(res) {
    Logger.info('Extract Level Data List', LevelService.name);
    let body = res.json();
    let levelList: Level[] = [];
    Logger.info('[RESPONSE][LEVEL]: ' + JSON.stringify(body), LevelService.name);
    for (let level of body) {
      let tempLevelGraph: Level= new Level(level.name, level.id, level.checked, level.y, level.height, level.levelGraph);
      tempLevelGraph.id = level.id;
      levelList.push(tempLevelGraph);

    }

    return levelList || {};

  }

  private extractLevel(res: Response) {
    Logger.info('Extract Level Data', LevelService.name);
    let body = res.json();
    Logger.info('[RESPONSE][LEVEL]: ' + JSON.stringify(body), LevelService.name);
    let level: Level = new Level(body.name, body.id, body.checked, body.y, body.height, body.levelGraph);
    level.id = body.id;
    return level || {};
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
