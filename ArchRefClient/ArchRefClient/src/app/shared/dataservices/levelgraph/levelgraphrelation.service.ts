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
   * @request - getLevelGraphRelations - Send GET all Level Graph Relations REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getLevelGraphRelations(): Observable<LevelGraphRelation[]> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send GET Level Graph Relation Request', LevelGraphRelationService.name);
    return this.http.get(this.levelGraphRelationUrl).map(this.extractLevelGraphRelations).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - getLevelGraphRelation - Send GET Level Graph Relations REQUEST
   *
   * @param - id: number - ID of the LevelGraphRelation which should be retrieved from the database
   *
   *******************************************************************************************************************************************************************************************************/
  public getLevelGraphRelation(id: number): Observable<LevelGraphRelation> {
    Logger.info('[REQUEST - LEVELGRAPHRELATION]: Send GET Level Graph Relations Request with ID: ' + id, LevelGraphRelationService.name);
    return this.http.get(this.levelGraphRelationUrl + '/' + id).map(this.extractLevelGraphRelation).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - createLevelGraphRelation - Send POST Level Graph Relations REQUEST
   *
   * @param - levelGraphRelation: LevelGraphRelation - LevelGraphRelation which should be created
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
   * @request - updateLevelGraphRelation- Send PUT Level Graph Relations REQUEST
   *
   * @param - levelGraphRelation: LevelGraphRelation - LevelGraphRelation which should be updated
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
   * @request - deleteLevelGraphRelation - Send DELETE Level Graph Relations REQUEST
   *
   * @param - id: number - ID of the LevelGraphRelation which should be deleted from the database
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
   * @response - extractLevelGraphRelations - Extract data from response data list
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  public extractLevelGraphRelations(res: Response) {
    let body = res.json();
    let levelGraphRelationList: LevelGraphRelation[] = [];
    Logger.info('Extract Level Graph Relation Data List', LevelGraphRelationService.name);
    Logger.info('[RESPONSE - LEVELGRAPHRELATION]: ' + JSON.stringify(body), LevelGraphRelationService.name);
    for (let levelGraphRelation of body) {
      let tempLevelGraphRelation: LevelGraphRelation = new LevelGraphRelation(levelGraphRelation.sourceLevelDepth, levelGraphRelation.targetLevelDepth, levelGraphRelation.sourceNodeId, levelGraphRelation.targetNodeId, levelGraphRelation.levelGraphId, levelGraphRelation.path, levelGraphRelation.levelGraphRelationType);
      tempLevelGraphRelation = levelGraphRelation;
//      tempLevelGraphRelation.id = levelGraphRelation.id;
//      tempLevelGraphRelation.name = levelGraphRelation.name;
//      tempLevelGraphRelation.expectedProperties = levelGraphRelation.expectedProperties;
//      tempLevelGraphRelation.providedProperties = levelGraphRelation.providedProperties;
//      tempLevelGraphRelation.levelGraph = levelGraphRelation.levelGraph;
//      tempLevelGraphRelation.targetLevelGraphNode = levelGraphRelation.targetLevelGraphNode;
//      tempLevelGraphRelation.sourceLevelGraphNode = levelGraphRelation.sourceLevelGraphNode;
//      tempLevelGraphRelation.sourceLevelId = levelGraphRelation.sourceLevelId;
//      tempLevelGraphRelation.targetLevelId = levelGraphRelation.targetLevelId;
//      tempLevelGraphRelation.sourceLevel = levelGraphRelation.sourceLevel;
//      tempLevelGraphRelation.targetLevel = levelGraphRelation.targetLevel;
      levelGraphRelationList.push(levelGraphRelation);
    }
    return levelGraphRelationList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - extractLevelGraphRelation - Extract data from response data object
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractLevelGraphRelation(res: Response) {
    let body = res.json();
    Logger.info('Extract Level Graph Relation Data', LevelGraphRelationService.name);
    Logger.info('[RESPONSE - LEVELGRAPHRELATION]: ' + JSON.stringify(body), LevelGraphRelationService.name);
    let levelGraphRelation: LevelGraphRelation = new LevelGraphRelation(body.sourceLevelDepth, body.targetLevelDepth, body.sourceNodeId, body.targetNodeId, body.levelGraphId, body.path, body.levelGraphRelationType);
    levelGraphRelation = body;
//    levelGraphRelation.id = body.id;
//    levelGraphRelation.name = body.name;
//    levelGraphRelation.expectedProperties = body.expectedProperties;
//    levelGraphRelation.providedProperties = body.providedProperties;
//    levelGraphRelation.levelGraph = body.levelGraph;
//    levelGraphRelation.targetLevelGraphNode = body.targetLevelGraphNode;
//    levelGraphRelation.sourceLevelGraphNode = body.sourceLevelGraphNode;
//    levelGraphRelation.sourceLevelId = body.sourceLevelId;
//    levelGraphRelation.targetLevelId = body.targetLevelId;
//    levelGraphRelation.sourceLevel = body.sourceLevel;
//    levelGraphRelation.targetLevel = body.targetLevel;
    return levelGraphRelation || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @error - handleError- Error Handling
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
