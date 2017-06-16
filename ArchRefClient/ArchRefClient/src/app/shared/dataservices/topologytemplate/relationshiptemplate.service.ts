import { Logger } from '../../../../logger/logger';
import { RelationshipTemplate } from '../../datamodels/topology/relationshiptemplate';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - RelationshipTemplateService implements the calls to the rest interface of the application server and
 *            handle the request construction and response extraction for Relationship Templates
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class RelationshipTemplateService {

  // URL of the REST Interface End-Point
  private relationshipTempalteUrl = '/api/relationshiptemplates';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET all RelationshipTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getRelationshipTemplates(): Observable<RelationshipTemplate[]> {
    Logger.info('[REQUEST - RELATIONSHIPTEMPLATE] Send GET Relationship Templates Request', RelationshipTemplateService.name);
    return this.http.get(this.relationshipTempalteUrl).map(this.extractRelationshipTemplateDataList).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send POST RelationshipTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public createRelationshipTemplate(relationshipTemplate: RelationshipTemplate): Observable<RelationshipTemplate> {
    Logger.info('[REQUEST - RELATIONSHIPTEMPLATE] Send POST Relationship Templates Request', RelationshipTemplateService.name);
    Logger.data('[REQUEST - RELATIONSHIPTEMPLATE]' + JSON.stringify(relationshipTemplate), RelationshipTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.relationshipTempalteUrl, relationshipTemplate, options).map(this.extractRelationshipTemplateData).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send PUT RelationshipTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public updateRelationshipTemplate(relationshipTemplate: RelationshipTemplate): Observable<RelationshipTemplate> {
    Logger.info('[REQUEST - RELATIONSHIPTEMPLATE] Send PUT Request Relationship Template', RelationshipTemplateService.name);
    Logger.data('[REQUEST - RELATIONSHIPTEMPLATE] ' + JSON.stringify(relationshipTemplate), RelationshipTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.relationshipTempalteUrl + '/' + relationshipTemplate.id, relationshipTemplate, options).map(this.extractRelationshipTemplateData).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send DELETE RelationshipTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteRelationshipTemplate(id: number): Observable<RelationshipTemplate> {
    Logger.info('[REQUEST - RELATIONSHIPTEMPLATE] Send DELETE Relationship Templates Request with ID: ' + id, RelationshipTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.relationshipTempalteUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data list
   *
   *******************************************************************************************************************************************************************************************************/
  public extractRelationshipTemplateDataList(res) {
    let body = res.json();
    let relationshipTemplateList: RelationshipTemplate[] = [];
    Logger.info('[RESPONSE - RELATIONSHIPTEMPLATE]: Extract Data of Response Body', RelationshipTemplateService.name);
    Logger.data('[RESPONSE - RELATIONSHIPTEMPLATE]: ' + JSON.stringify(body), RelationshipTemplateService.name);
    for (let relationshipTemplate of body) {
      let tempRelationshipTemplate: RelationshipTemplate = new RelationshipTemplate(relationshipTemplate.sourceNodeId, relationshipTemplate.targetNodeId, relationshipTemplate.path, relationshipTemplate.relationshipTypeId, relationshipTemplate.topologyTemplateId);
      relationshipTemplate.name = tempRelationshipTemplate.name;
      tempRelationshipTemplate.id = relationshipTemplate.id;
      relationshipTemplateList.push(tempRelationshipTemplate);
    }
    return relationshipTemplateList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractRelationshipTemplateData(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - RELATIONSHIPTEMPLATE]: Extract Data of Response Body', RelationshipTemplateService.name);
    Logger.data('[RESPONSE - RELATIONSHIPTEMPLATE]: ' + JSON.stringify(body), RelationshipTemplateService.name);
    let relationshipTemplate: RelationshipTemplate = new RelationshipTemplate(body.sourceNodeId, body.targetNodeId, body.path, body.relationshipTypeId, body.topologyTemplateId);
    relationshipTemplate.id = body.id;
    relationshipTemplate.name = body.name;
    return relationshipTemplate || {};
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
