import { Logger } from '../../../../logger/logger';
import { LevelGraph } from '../../datamodels/levelgraph/levelgraph';
import { TopologyTemplate } from '../../datamodels/topology/topologytemplate';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

/**********************************************************************************************************************************************************************************************************
 *
 * @service - TopologyTemplateService implements the calls to the rest interface of the application server and
 *            handle the request construction and response extraction for Topology Templates
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class TopologyTemplateService {

  // URL of the REST Interface End-Point
  private topologyTemplateURL = '/api/topologytemplates';
  private refinmentAlgorithmURL = '/api/refinement';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET all Topology Template REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getTopologyTemplates(): Observable<TopologyTemplate[]> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send GET Topology TemplateRequest', TopologyTemplateService.name);
    return this.http.get(this.topologyTemplateURL).map(this.extractTopologyTemplates).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET Topology Template REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public getTopologyTemplate(id: number): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send GET Topology Request with ID: ' + id, TopologyTemplateService.name);
    return this.http.get(this.topologyTemplateURL + '/' + id).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send POST Topology Template REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public createTopologyTemplate(topologyTemplate: TopologyTemplate): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send POST Topology Template Request', TopologyTemplateService.name);
    Logger.data('[REQUEST - TOPOLOGYTEMPLATE]: ' + JSON.stringify(topologyTemplate), TopologyTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.topologyTemplateURL, topologyTemplate, options).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send PUT Topology Template REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public updateTopologyTemplate(topologyTemplate: TopologyTemplate): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send PUT Topology Template Request', TopologyTemplateService.name);
    Logger.data('[REQUEST - TOPOLOGYTEMPLATE]: ' + JSON.stringify(topologyTemplate), TopologyTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.topologyTemplateURL + '/' + topologyTemplate.id, topologyTemplate, options).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send DELETE Topology Template REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public deleteTopologyTemplate(id: number): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send DELETE Topology Template Request', TopologyTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.topologyTemplateURL + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET refineSingleLevelGraphTopologyTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public refineSingleLevelGraphTopologyTemplate(idTopologyTemplate: number, idLevelGraphTemplate: number): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send GET Refined Topology Template Request with single LevelGraph and not Level Graph Konform', TopologyTemplateService.name);
    return this.http.get(this.refinmentAlgorithmURL + '/' + 'singelLevelGraphRefinment' + '/' + idTopologyTemplate + '/' + idLevelGraphTemplate).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET refineSingleLevelGraphKonformTopologyTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public refineSingleLevelGraphKonformTopologyTemplate(idTopologyTemplate: number, idLevelGraphTemplate: number): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send GET Refined Topology Template Request with single LevelGraph and Level Graph Konform', TopologyTemplateService.name);
    return this.http.get(this.refinmentAlgorithmURL + '/' + 'singelLevelGraphKonformRefinment' + '/' + idTopologyTemplate + '/' + idLevelGraphTemplate).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET refineSingleLevelGraphLevelKonformTopologyTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public refineSingleLevelGraphLevelKonformTopologyTemplate(idTopologyTemplate: number, idLevelGraphTemplate: number): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send GET Refined Topology Template Request with single LevelGraph and Level Graph Level Konform', TopologyTemplateService.name);
    return this.http.get(this.refinmentAlgorithmURL + '/' + 'singelLevelGraphLevelKonformRefinment' + '/' + idTopologyTemplate + '/' + idLevelGraphTemplate).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET refineMultiLevelGraphTopologyTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public refineMultiLevelGraphTopologyTemplate(idTopologyTemplate: number, levelGraphs: LevelGraph[]): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send GET Request Topology Request Template', TopologyTemplateService.name);
    return this.http.get(this.refinmentAlgorithmURL + '/' + 'multiLevelGraphRefinment' + '/' + idTopologyTemplate, levelGraphs).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET refineMultiLevelGraphKonformTopologyTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public refineMultiLevelGraphKonformTopologyTemplate(idTopologyTemplate: number, levelGraphs: LevelGraph[]): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send GET Request Topology Request Template', TopologyTemplateService.name);
    return this.http.get(this.refinmentAlgorithmURL + '/' + 'multiLevelGraphKonformRefinment' + '/' + idTopologyTemplate, levelGraphs).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET refineMultiLevelGraphLevelKonformTopologyTemplate REQUEST
   *
   *******************************************************************************************************************************************************************************************************/
  public refineMultiLevelGraphLevelKonformTopologyTemplate(idTopologyTemplate: number, levelGraphs: LevelGraph[]): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - TOPOLOGYTEMPLATE]: Send GET Request Topology Request Template', TopologyTemplateService.name);
    return this.http.get(this.refinmentAlgorithmURL + '/' + 'multiLevelGraphLevelKonformRefinment' + '/' + idTopologyTemplate, levelGraphs).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data list
   *
   *******************************************************************************************************************************************************************************************************/
  public extractTopologyTemplates(res) {
    let body = res.json();
    let topologyTemplateList: TopologyTemplate[] = [];
    Logger.info('[RESPONSE - TOPOLOGYTEMPLATE]: Extract Topology Template Data List', TopologyTemplateService.name);
    Logger.info('[RESPONSE - TOPOLOGYTEMPLATE]: ' + JSON.stringify(body), TopologyTemplateService.name);
    for (let topologytemplate of body) {
      let tempTopologyTemplate: TopologyTemplate = new TopologyTemplate();
      tempTopologyTemplate.id = topologytemplate.id;
      tempTopologyTemplate.name = topologytemplate.name;
      tempTopologyTemplate.nodeTemplates = topologytemplate.nodeTemplates;
      tempTopologyTemplate.relationshipTemplates = topologytemplate.relationshipTemplates;
      tempTopologyTemplate.parentTopologyTemplate = topologytemplate.parentTopologyTemplate;
      tempTopologyTemplate.childTopologyTemplates = topologytemplate.childTopologyTemplates;
      tempTopologyTemplate.abstractionLevel = topologytemplate.abstractionLevel;

      topologyTemplateList.push(tempTopologyTemplate);
    }
    return topologyTemplateList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractTopologyTemplate(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - TOPOLOGYTEMPLATE]: ' + JSON.stringify(body), TopologyTemplateService.name);
    Logger.info('[RESPONSE - TOPOLOGYTEMPLATE]: Extract Topology Template Data', TopologyTemplateService.name);
    let topologyTemplate: TopologyTemplate = new TopologyTemplate();
    topologyTemplate.id = body.id;
    topologyTemplate.name = body.name;
    topologyTemplate.nodeTemplates = body.nodeTemplates;
    topologyTemplate.relationshipTemplates = body.relationshipTemplates;
    topologyTemplate.parentTopologyTemplate = body.parentTopologyTemplate;
    topologyTemplate.childTopologyTemplates = body.childTopologyTemplates;
    topologyTemplate.abstractionLevel = body.abstractionLevel;
    return topologyTemplate || {};
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
