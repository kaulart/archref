import { Logger } from '../../../../logger/logger';
import { NodeTemplate } from '../../datamodels/topology/nodetemplate';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - NodeTemplateService implements the calls to the rest interface of the application server and
 *            handle the request construction and response extraction for NodeTemplates
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class NodeTemplateService {

  // URL of the REST Interface End-Point
  private nodetemplateUrl = '/api/nodetemplates';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET all NodeTemplates REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getNodeTemplates(): Observable<NodeTemplate[]> {
    Logger.info('[REQUEST - NODETEMPLATE] Send GET Node Templates Request', NodeTemplateService.name);
    return this.http.get(this.nodetemplateUrl).map(this.extractNodeTemplates).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send POST NodeTemplates REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public createNodeTemplate(nodeTemplate: NodeTemplate): Observable<NodeTemplate> {
    Logger.info('[REQUEST - NODETEMPLATE] Send POST Node Template Request', NodeTemplateService.name);
    Logger.data('[REQUEST - NODETEMPLATE]' + JSON.stringify(nodeTemplate), NodeTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.nodetemplateUrl, nodeTemplate, options).map(this.extractNodeTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send PUT NodeTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public updateNodeTemplate(nodeTemplate: NodeTemplate): Observable<NodeTemplate> {
    Logger.info('[REQUEST - NODETEMPLATE] Send PUT Node Template Request', NodeTemplateService.name);
    Logger.data('[REQUEST - NODETEMPLATE] ' + JSON.stringify(nodeTemplate), NodeTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.nodetemplateUrl + '/' + nodeTemplate.id, nodeTemplate, options).map(this.extractNodeTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send DELETE NodeTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteNodeTemplate(id: number): Observable<NodeTemplate> {
    Logger.info('[REQUEST - NODETEMPLATE] Send DELETE NodeTemplate Request with ID: ' + id, NodeTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.nodetemplateUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data list
   *
   *******************************************************************************************************************************************************************************************************/
  public extractNodeTemplates(res) {
    let body = res.json();
    let nodeTemplateList: NodeTemplate[] = [];
    Logger.info('[RESPONSE - NODETEMPLATE]: Extract Data of Response Body', NodeTemplateService.name);
    Logger.data('[RESPONSE - NODETEMPLATE]: ' + JSON.stringify(body), NodeTemplateService.name);
    for (let nodeTemplate of body) {
      let tempNodeTemplate: NodeTemplate = new NodeTemplate(nodeTemplate.x, nodeTemplate.y, nodeTemplate.width, nodeTemplate.height, nodeTemplate.nodeTypeId, nodeTemplate.topologyTemplateId);
      tempNodeTemplate.name = nodeTemplate.name;
      tempNodeTemplate.id = nodeTemplate.id;
      tempNodeTemplate.levelGraphNodeId = nodeTemplate.levelGraphNodeId;
      nodeTemplateList.push(tempNodeTemplate);
    }
    return nodeTemplateList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractNodeTemplate(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - NODETEMPLATE]: Extract Data of Response Body', NodeTemplateService.name);
    Logger.data('[RESPONSE - NODETEMPLATE]: ' + JSON.stringify(body), NodeTemplateService.name);
    let nodeTemplate: NodeTemplate = new NodeTemplate(body.x, body.y, body.width, body.height, body.nodeTypeId, body.topologyTemplateId);
    nodeTemplate.name = nodeTemplate.name;
    nodeTemplate.id = body.id;
    nodeTemplate.levelGraphNodeId = body.levelGraphNodeId;
    return nodeTemplate || {};
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
