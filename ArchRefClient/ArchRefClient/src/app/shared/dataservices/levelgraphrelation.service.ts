import { Logger } from '../../../logger/logger';
import { LevelGraphRelation } from '../datamodel/levelgraphmodel/levelgraphrelation';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

/********************************************************************************************************************
 *
 * LevelGraphRelation Service implements the calls to the rest interface of the application server and
 * handle the request construction and response extraction for Level Graph Relations
 *
 ********************************************************************************************************************/
@Injectable()
export class LevelGraphRelationService {

  // URL of the REST Interface End-Point
  private levelGraphRelationUrl = '/api/levelgraphrelations';

  constructor(private http: Http) { }

  /******************************************************************************************************************
   *
   * Send GET all Level Graph Relations REQUEST
   *
   ******************************************************************************************************************/
  public getLevelGraphRelations(): Observable<LevelGraphRelation[]> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send GET Level Graph Relation Request', LevelGraphRelationService.name);
    return this.http.get(this.levelGraphRelationUrl).map(this.extractLevelGraphRelationDataList).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send GET Level Graph Relations REQUEST
   *
   ******************************************************************************************************************/
  public getLevelGraphRelation(id: number): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send GET Level Graph Relations Request with ID: ' + id, LevelGraphRelationService.name);
    return this.http.get(this.levelGraphRelationUrl + '/' + id).map(this.extractLevelGraphRelation).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send POST Level Graph Relations REQUEST
   *
   ******************************************************************************************************************/
  public createLevelGraphRelation(levelGraphRelation: LevelGraphRelation): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send POST Level Graph Relation Request', LevelGraphRelationService.name);
    Logger.data('[REQUEST - LEVELGRAPHRELATION]: ' + JSON.stringify(levelGraphRelation), LevelGraphRelationService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphRelationUrl, levelGraphRelation, options).map(this.extractLevelGraphRelation).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send PUT Level Graph Relations REQUEST
   *
   ******************************************************************************************************************/
  public updateLevelGraphRelation(levelGraphRelation: LevelGraphRelation): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send PUT Level Graph Relation Request', LevelGraphRelationService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.levelGraphRelationUrl + '/' + levelGraphRelation.id, levelGraphRelation, options).map(this.extractLevelGraphRelation).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send DELETE Level Graph Relations REQUEST
   *
   ******************************************************************************************************************/
  public deleteLevelGraphRelation(id: number): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send DELETE Level Graph Relation Request', LevelGraphRelationService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.levelGraphRelationUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Extract data from response data list
   *
   ******************************************************************************************************************/
  public extractLevelGraphRelationDataList(res) {
    Logger.info('Extract Level Graph Relation Data List', LevelGraphRelationService.name);
    let body = res.json();
    let levelGraphRelationList: LevelGraphRelation[] = [];
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: ' + JSON.stringify(body), LevelGraphRelationService.name);
    for (let levelGraphRelation of body) {
      let tempLevelGraphRelation: LevelGraphRelation = new LevelGraphRelation(levelGraphRelation.sourceLevelValue, levelGraphRelation.targetLevelValue, levelGraphRelation.sourceLevelGraphNode, levelGraphRelation.targetLevelGraphNode, levelGraphRelation.levelGraph, levelGraphRelation.path, levelGraphRelation.levelGraphRelationType);
      tempLevelGraphRelation.id = levelGraphRelation.id;
      levelGraphRelationList.push(levelGraphRelation);
    }
    return levelGraphRelationList || {};
  }

  /******************************************************************************************************************
   *
   *  Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractLevelGraphRelation(res: Response) {
    Logger.info('Extract Level Graph Relation Data', LevelGraphRelationService.name);
    let body = res.json();
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: ' + JSON.stringify(body), LevelGraphRelationService.name);
    let levelGraphRelation: LevelGraphRelation = new LevelGraphRelation(body.sourceLevelValue, body.targetLevelValue, body.sourceLevelGraphNode, body.targetLevelGraphNode, body.levelGraph, body.path, body.levelGraphRelationType);
    levelGraphRelation.id = body.id;
    return levelGraphRelation || {};
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
