import { Logger } from '../../../logger/logger';
import { LevelGraphRelation } from '../datamodel/levelgraphmodel/levelgraphrelation';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class LevelGraphRelationService{

   private levelGraphRelationUrl = '/api/levelgraphrelation';

  constructor(private http: Http) { }

  public getLevelGraphRelations(): Observable<LevelGraphRelation[]> {
    Logger.info('[REQUEST]: Send GET Request Level Graph Relations', LevelGraphRelationService.name);
    return this.http.get(this.levelGraphRelationUrl)
      .map(this.extractLevelGraphRelationDataList)
      .catch(this.handleError);

  }

  public getLevelGraphRelation(id: number): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST]: Send GET Request Level Graph Relations with ID: ' + id, LevelGraphRelationService.name);
    return this.http.get(this.levelGraphRelationUrl + '/' + id)
      .map(this.extractLevelGraphRelation)
      .catch(this.handleError);
  }

  public createLevelGraphRelation(levelGraphRelation: LevelGraphRelation): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST]: Send POST Request Level Graph Relations', LevelGraphRelationService.name);
    Logger.data('[LEVEL GRAPH RELATION ]: ' + JSON.stringify(levelGraphRelation), LevelGraphRelationService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphRelationUrl, levelGraphRelation, options)
      .map(this.extractLevelGraphRelation)
      .catch(this.handleError);
  }

  public updateLevelGraphRelation(levelGraphRelation: LevelGraphRelation): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST]: Send PUT Request Level Graph Relation', LevelGraphRelationService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphRelationUrl, levelGraphRelation, options)
      .map(this.extractLevelGraphRelation)
      .catch(this.handleError);
  }

  public deleteLevelGraphRelation(id: number): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST]: Send DELETE Request Level Graph Relation', LevelGraphRelationService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.levelGraphRelationUrl + '/' + id, options)
      .map(res => res)
      .catch(this.handleError);
  }

  public extractLevelGraphRelationDataList(res) {
    Logger.info('Extract Level Graph Relation Data List', LevelGraphRelationService.name);
    let body = res.json();
    let levelGraphRelationList: LevelGraphRelation[] = [];
    Logger.info('[RESPONSE][LEVELGRAPHNODE]: ' + JSON.stringify(body), LevelGraphRelationService.name);
    for (let levelGraphRelation of body) {
      let tempLevelGraphRelation: LevelGraphRelation = new LevelGraphRelation(levelGraphRelation.sourceLevelValue, levelGraphRelation.targetLevelValue, levelGraphRelation.sourceLevelGraphNode, levelGraphRelation.targetLevelGraphNode, levelGraphRelation.levelGraph, levelGraphRelation.path, levelGraphRelation.levelGraphRelationType);
      tempLevelGraphRelation.id = levelGraphRelation.id;
      levelGraphRelationList.push(levelGraphRelation);

    }

    return levelGraphRelationList || {};

  }

  private extractLevelGraphRelation(res: Response) {
    Logger.info('Extract Level Graph Relation Data', LevelGraphRelationService.name);
    let body = res.json();
    Logger.info('[RESPONSE][LEVELGRAPHRELATION]: ' + JSON.stringify(body), LevelGraphRelationService.name);
    let levelGraphRelation: LevelGraphRelation = new LevelGraphRelation(body.sourceLevelValue, body.targetLevelValue, body.sourceLevelGraphNode, body.targetLevelGraphNode, body.levelGraph, body.path, body.levelGraphRelationType);
    levelGraphRelation.id = body.id;
    return levelGraphRelation || {};
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
