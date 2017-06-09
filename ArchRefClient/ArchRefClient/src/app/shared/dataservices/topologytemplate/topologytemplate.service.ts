import { Logger } from '../../../../logger/logger';
import { TopologyTemplate } from '../../datamodels/topology/topologytemplate';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

/********************************************************************************************************************
 *
 * Topology Template Service implements the calls to the rest interface of the application server and
 * handle the request construction and response extraction for Topology Templates
 *
 ********************************************************************************************************************/
@Injectable()
export class TopologyTemplateService {

  // URL of the REST Interface End-Point
  private topologyTemplateURL = '/api/topologytemplates';

  constructor(private http: Http) { }

  /******************************************************************************************************************
   *
   * Send GET all Topology Template REQUEST
   *
   ******************************************************************************************************************/
  public getTopologyTemplates(): Observable<TopologyTemplate[]> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send GET Request Topology Template', TopologyTemplateService.name);
    return this.http.get(this.topologyTemplateURL).map(this.extractTopologyTemplates).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send GET Topology Template REQUEST
   *
   ******************************************************************************************************************/
  public getTopologyTemplate(id: number): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send GET Request Topology with ID: ' + id, TopologyTemplateService.name);
    return this.http.get(this.topologyTemplateURL + '/' + id).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send POST Topology Template REQUEST
   *
   ******************************************************************************************************************/
  public createTopologyTemplate(topologyTemplate: TopologyTemplate): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send POST Request Topology Template', TopologyTemplateService.name);
    Logger.data('[REQUEST - TOPOLOGYTEMPLATE]: ' + JSON.stringify(topologyTemplate), TopologyTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.topologyTemplateURL, topologyTemplate, options).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send PUT Topology Template REQUEST
   *
   ******************************************************************************************************************/
  public updateTopologyTemplate(topologyTemplate: TopologyTemplate): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send PUT Request Topology Template', TopologyTemplateService.name);
    Logger.data('[REQUEST - TOPOLOGYTEMPLATE]: ' + JSON.stringify(topologyTemplate), TopologyTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.topologyTemplateURL + '/' + topologyTemplate.id, topologyTemplate, options).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Send DELETE Topology Template REQUEST
   *
   ******************************************************************************************************************/
  public deleteTopologyTemplate(id: number): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send DELETE Request Topology Template', TopologyTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.topologyTemplateURL + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * Extract data from response data list
   *
   ******************************************************************************************************************/
  public extractTopologyTemplates(res) {
    let body = res.json();
    let topologyTemplateList: TopologyTemplate[] = [];
    Logger.info('[RESPONSE - TOPOLOGYTEMPLATE]: Extract Topology Template Data List', TopologyTemplateService.name);
    Logger.info('[RESPONSE - TOPOLOGYTEMPLATE]: ' + JSON.stringify(body), TopologyTemplateService.name);
    for (let topologytemplate of body) {
      let tempTopologyTemplate: TopologyTemplate = new TopologyTemplate(topologytemplate.name);
      tempTopologyTemplate.id = topologytemplate.id;
      tempTopologyTemplate.nodeTemplates = topologytemplate.nodeTemplates;
      tempTopologyTemplate.relationshipTemplates = topologytemplate.relationshipTemplates;
      tempTopologyTemplate.parentTopologyTemplate = topologytemplate.parentTopologyTemplate;
      tempTopologyTemplate.childTopologyTemplates = topologytemplate.childTopologyTemplates;
      tempTopologyTemplate.abstractionLevel = topologytemplate.abstractionLevel;

      topologyTemplateList.push(tempTopologyTemplate);
    }
    return topologyTemplateList || {};
  }

  /******************************************************************************************************************
   *
   *  Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractTopologyTemplate(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - TOPOLOGYTEMPLATE]: ' + JSON.stringify(body), TopologyTemplateService.name);
    Logger.info('[RESPONSE - TOPOLOGYTEMPLATE]: Extract Topology Template Data', TopologyTemplateService.name);
    let topologyTemplate: TopologyTemplate = new TopologyTemplate(body.name);
    topologyTemplate.id = body.id;
    topologyTemplate.nodeTemplates = body.nodeTemplates;
    topologyTemplate.relationshipTemplates = body.relationshipTemplates;
    topologyTemplate.parentTopologyTemplate = body.parentTopologyTemplate;
    topologyTemplate.childTopologyTemplates = body.childTopologyTemplates;
    topologyTemplate.abstractionLevel = body.abstractionLevel;
    return topologyTemplate || {};
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
