import { Logger } from '../../../../logger/logger';
import { NodeTemplate } from '../../datamodels/topology/nodetemplate';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

/********************************************************************************************************************
 *
 * NodeTemplate Service implements the calls to the rest interface of the application server and
 * handle the request construction and response extraction for Node Templates
 *
 ********************************************************************************************************************/
@Injectable()
export class NodeTemplateService {

  // URL of the REST Interface End-Point
  private nodetemplateUrl = '/api/nodetemplates';

  constructor(private http: Http) { }

  /******************************************************************************************************************
   *
   * Send GET all NodeTemplates REQUEST
   *
   ******************************************************************************************************************/
  public getNodeTemplates(): Observable<NodeTemplate[]> {
    Logger.info('[REQUEST - NODETEMPLATE] Send GET Node Templates Request', NodeTemplateService.name);
    return this.http.get(this.nodetemplateUrl).map(this.extractNodeTemplateDataList).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send POST NodeTemplates REQUEST
   *
   ******************************************************************************************************************/
  public createNodeTemplate(nodeTemplate: NodeTemplate): Observable<NodeTemplate> {
    Logger.info('[REQUEST - NODETEMPLATE] Send POST Node Template Request', NodeTemplateService.name);
    Logger.data('[REQUEST - NODETEMPLATE]' + JSON.stringify(nodeTemplate), NodeTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.nodetemplateUrl, nodeTemplate, options).map(this.extractNodeTemplateData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send PUT NodeTemplate REQUEST
   *
   ******************************************************************************************************************/
  public updateNodeTemplate(nodeTemplate: NodeTemplate): Observable<NodeTemplate> {
    Logger.info('[REQUEST - NODETEMPLATE] Send PUT Request Node Template', NodeTemplateService.name);
    Logger.data('[REQUEST - NODETEMPLATE] ' + JSON.stringify(nodeTemplate), NodeTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.nodetemplateUrl + '/' + nodeTemplate.id, nodeTemplate, options).map(this.extractNodeTemplateData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send DELETE NodeTemplate REQUEST
   *
   ******************************************************************************************************************/
  public deleteNodeTemplate(id: number): Observable<NodeTemplate> {
    Logger.info('[REQUEST - NODETEMPLATE] Send DELETE NodeTemplate Request with ID: ' + id, NodeTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.nodetemplateUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Extract data from response data list
   *
   ******************************************************************************************************************/
  public extractNodeTemplateDataList(res) {
    Logger.info('[RESPONSE - NODETEMPLATE]: Extract Data of Response Body', NodeTemplateService.name);
    let body = res.json();
    let nodeTemplateList: NodeTemplate[] = [];
    Logger.data('[RESPONSE - NODETEMPLATE]: ' + JSON.stringify(body), NodeTemplateService.name);
    for (let nodeTemplate of body) {
      let tempNodeTemplate: NodeTemplate = new NodeTemplate(nodeTemplate.name, nodeTemplate.repositoryId, nodeTemplate.x, nodeTemplate.y, nodeTemplate.width, nodeTemplate.height);
      tempNodeTemplate.id = nodeTemplate.id;
      nodeTemplateList.push(tempNodeTemplate);
    }
    return nodeTemplateList || {};
  }

  /******************************************************************************************************************
   *
   *  Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractNodeTemplateData(res: Response) {
    Logger.info('[RESPONSE - NODETEMPLATE]: Extract Data of Response Body', NodeTemplateService.name);
    let body = res.json();
    Logger.data('[RESPONSE - NODETEMPLATE]: ' + JSON.stringify(body), NodeTemplateService.name);
    let nodeTemplate: NodeTemplate = new NodeTemplate(body.name, body.repositoryId, body.x, body.y, body.width, body.height);
    nodeTemplate.id = body.id;
    return nodeTemplate || {};
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
