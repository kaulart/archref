import { Logger } from '../../../../logger/logger';
import { LevelGraphRelation } from '../../datamodels/levelgraph/levelgraphrelation';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - LevelGraphRelationService implements the calls to the rest interface of the application server and
 *            handle the request construction and response extraction for LevelGraphRelations
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class LevelGraphRelationService {

  // URL of the REST Interface End-Point
  private levelGraphRelationUrl = '/api/levelgraphrelations';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET all Level Graph Relations REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getLevelGraphRelations(): Observable<LevelGraphRelation[]> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send GET Level Graph Relation Request', LevelGraphRelationService.name);
    return this.http.get(this.levelGraphRelationUrl).map(this.extractLevelGraphRelations).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET Level Graph Relations REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getLevelGraphRelation(id: number): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send GET Level Graph Relations Request with ID: ' + id, LevelGraphRelationService.name);
    return this.http.get(this.levelGraphRelationUrl + '/' + id).map(this.extractLevelGraphRelation).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send POST Level Graph Relations REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public createLevelGraphRelation(levelGraphRelation: LevelGraphRelation): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send POST Level Graph Relation Request', LevelGraphRelationService.name);
    Logger.data('[REQUEST - LEVELGRAPHRELATION]: ' + JSON.stringify(levelGraphRelation), LevelGraphRelationService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphRelationUrl, levelGraphRelation, options).map(this.extractLevelGraphRelation).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send PUT Level Graph Relations REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public updateLevelGraphRelation(levelGraphRelation: LevelGraphRelation): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send PUT Level Graph Relation Request', LevelGraphRelationService.name);
    Logger.data('[REQUEST - LEVELGRAPHRELATION]: ' + JSON.stringify(levelGraphRelation), LevelGraphRelationService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.levelGraphRelationUrl + '/' + levelGraphRelation.id, levelGraphRelation, options).map(this.extractLevelGraphRelation).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send DELETE Level Graph Relations REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteLevelGraphRelation(id: number): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send DELETE Level Graph Relation Request', LevelGraphRelationService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.levelGraphRelationUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data list
   *
   *******************************************************************************************************************************************************************************************************/
  public extractLevelGraphRelations(res) {
    let body = res.json();
    let levelGraphRelationList: LevelGraphRelation[] = [];
    Logger.info('Extract Level Graph Relation Data List', LevelGraphRelationService.name);
    Logger.info('[RESPONSE - LEVELGRAPHRELATION]: ' + JSON.stringify(body), LevelGraphRelationService.name);
    for (let levelGraphRelation of body) {
      let tempLevelGraphRelation: LevelGraphRelation = new LevelGraphRelation(levelGraphRelation.sourceLevelDepth, levelGraphRelation.targetLevelDepth, levelGraphRelation.sourceNodeId, levelGraphRelation.targetNodeId, levelGraphRelation.levelGraphId, levelGraphRelation.path, levelGraphRelation.levelGraphRelationType);
      tempLevelGraphRelation.id = levelGraphRelation.id;
      tempLevelGraphRelation.levelGraph = levelGraphRelation.levelGraph;
      tempLevelGraphRelation.levelGraphNodes = levelGraphRelation.levelGraphNodes;
      tempLevelGraphRelation.levels = levelGraphRelation.levels;
      levelGraphRelationList.push(levelGraphRelation);
    }
    return levelGraphRelationList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractLevelGraphRelation(res: Response) {
    let body = res.json();
    Logger.info('Extract Level Graph Relation Data', LevelGraphRelationService.name);
    Logger.info('[RESPONSE - LEVELGRAPHRELATION]: ' + JSON.stringify(body), LevelGraphRelationService.name);
    let levelGraphRelation: LevelGraphRelation = new LevelGraphRelation(body.sourceLevelDepth, body.targetLevelDepth, body.sourceNodeId, body.targetNodeId, body.levelGraphId, body.path, body.levelGraphRelationType);
    levelGraphRelation.id = body.id;
    levelGraphRelation.levelGraph = body.levelGraph;
    levelGraphRelation.levelGraphNodes = body.levelGraphNodes;
    levelGraphRelation.levels = body.levels;
    return levelGraphRelation || {};
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
