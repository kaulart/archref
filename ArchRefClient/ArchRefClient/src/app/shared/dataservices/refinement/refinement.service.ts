import { Logger } from '../../../../logger/logger';
import { LevelGraph } from '../../datamodels/levelgraph/levelgraph';
import { TopologyTemplate } from '../../datamodels/topology/topologytemplate';
import { TopologyTemplateService } from '../topologytemplate/topologytemplate.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

/*********************************************************************************************************************************************************************************************************
 *
 * @service - RefinementService  - Implements the request call to the server interface and wait for a response to extract the results of the refinement process
 *
 *********************************************************************************************************************************************************************************************************/
@Injectable()
export class RefinementService {

  // URL of the REST Interface End-Point
  private refinmentAlgorithmURL = '/api/refinement';

  constructor(private http: Http) { }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET refineTopologyTemplate REQUEST
   *
   * @param - idTopologyTemplate: number - ID of the TopologyTemplate which should be refined
   * @param - steps: number - Number of refinement steps
   * @param - levelGraphs: LevelGraphs - Merged Level Graph which should be used for refinement
   *
   *******************************************************************************************************************************************************************************************************/
  public refineTopologyTemplate(idTopologyTemplate: number, levelGraph: LevelGraph, smi: number): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - REFINEMNET]: Send GET Refined Topology Template Request', RefinementService.name);
    Logger.info('[REQUEST - REFINEMNET]: ' + JSON.stringify(levelGraph), TopologyTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.refinmentAlgorithmURL + '/refineTopologyTemplate/' + idTopologyTemplate + '/' + smi, levelGraph, options).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @request - Send GET refineOneStepTopologyTemplate REQUEST
   *
   * @param - idTopologyTemplate: number - ID of the TopologyTemplate which should be refined
   * @param - levelGraph: LevelGraph - Merged Level Graph which should be used for refinement
   *
   *******************************************************************************************************************************************************************************************************/
  public refineOneStepTopologyTemplate(idTopologyTemplate: number, levelGraph: LevelGraph, smi: number): Observable<TopologyTemplate> {
    Logger.info('[REQUEST - REFINEMNET]: Send GET Refined Topology Template Request', RefinementService.name);
    Logger.info('[REQUEST - REFINEMNET]: ' + JSON.stringify(levelGraph), TopologyTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.refinmentAlgorithmURL + '/refineOneStepTopologyTemplate/' + idTopologyTemplate + '/' + smi, levelGraph, options).map(this.extractTopologyTemplate).catch(this.handleError);
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data list
   *
   * @param - res: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  public extractTopologyTemplates(res) {
    let body = res.json();
    let topologyTemplateList: TopologyTemplate[] = [];
    Logger.info('[RESPONSE - REFINEMNET]: Extract Topology Template Data List', TopologyTemplateService.name);
    Logger.info('[RESPONSE - REFINEMNET]: ' + JSON.stringify(body), TopologyTemplateService.name);
    for (let topologytemplate of body) {
      let tempTopologyTemplate: TopologyTemplate = new TopologyTemplate();
      tempTopologyTemplate = topologytemplate;
//      tempTopologyTemplate.id = topologytemplate.id;
//      tempTopologyTemplate.name = topologytemplate.name;
//      tempTopologyTemplate.nodeTemplates = topologytemplate.nodeTemplates;
//      tempTopologyTemplate.relationshipTemplates = topologytemplate.relationshipTemplates;
//      tempTopologyTemplate.parentTopologyTemplate = topologytemplate.parentTopologyTemplate;
//      tempTopologyTemplate.childTopologyTemplates = topologytemplate.childTopologyTemplates;
//      tempTopologyTemplate.abstractionLevel = topologytemplate.abstractionLevel;

      topologyTemplateList.push(tempTopologyTemplate);
    }
    return topologyTemplateList || {};
  }

  /********************************************************************************************************************************************************************************************************
   *
   * @response - Extract data from response data object
   *
   * @param - error: Response - Response Object
   *
   *******************************************************************************************************************************************************************************************************/
  private extractTopologyTemplate(res: Response) {
    let body = res.json();
    Logger.info('[RESPONSE - REFINEMNET]: ' + JSON.stringify(body), TopologyTemplateService.name);
    Logger.info('[RESPONSE - REFINEMNET]: Extract Topology Template Data', TopologyTemplateService.name);
    let topologyTemplate: TopologyTemplate = new TopologyTemplate();
    topologyTemplate = body;
//    topologyTemplate.id = body.id;
//    topologyTemplate.name = body.name;
//    topologyTemplate.nodeTemplates = body.nodeTemplates;
//    topologyTemplate.relationshipTemplates = body.relationshipTemplates;
//    topologyTemplate.parentTopologyTemplate = body.parentTopologyTemplate;
//    topologyTemplate.childTopologyTemplates = body.childTopologyTemplates;
//    topologyTemplate.abstractionLevel = body.abstractionLevel;
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
