import { Logger } from '../../../logger/logger';
import { TopologyTemplate } from '../datamodel/topologymodel/topologytemplate';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class TopologyTemplateService {

   private topologyTemplateURL = '/api/topologytemplates';

  constructor(private http: Http) { }

  public getTopologyTemplates(): Observable<TopologyTemplate[]> {
    Logger.info('[REQUEST]: Send GET Request Topology Template', TopologyTemplateService.name);
    return this.http.get(this.topologyTemplateURL)
      .map(this.extractTopologyTemplateDataList)
      .catch(this.handleError);

  }

  public getTopologyTemplate(id: number): Observable<TopologyTemplate> {
    Logger.info('[REQUEST]: Send GET Request Topology with ID: ' + id, TopologyTemplateService.name);
    return this.http.get(this.topologyTemplateURL + '/' + id)
      .map(this.extractTopologyTemplate)
      .catch(this.handleError);
  }

  public createTopologyTemplate(topologyTemplate: TopologyTemplate): Observable<TopologyTemplate> {
    Logger.info('[REQUEST]: Send POST Request Topology Template', TopologyTemplateService.name);
    Logger.data('[LEVEL GRAPH]: ' + JSON.stringify(topologyTemplate), TopologyTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.topologyTemplateURL, topologyTemplate, options)
      .map(this.extractTopologyTemplate)
      .catch(this.handleError);
  }

  public updateTopologyTemplate(topologyTemplate: TopologyTemplate): Observable<TopologyTemplate> {
    Logger.info('[REQUEST]: Send PUT Request Topology Template', TopologyTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.topologyTemplateURL, topologyTemplate, options)
      .map(this.extractTopologyTemplate)
      .catch(this.handleError);
  }

  public deleteTopologyTemplate(id: number): Observable<TopologyTemplate> {
    Logger.info('[REQUEST]: Send DELETE Request Topology Template', TopologyTemplateService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.topologyTemplateURL + '/' + id, options)
      .map(res => res)
      .catch(this.handleError);
  }

  public extractTopologyTemplateDataList(res) {
    Logger.info('Extract Level Graph Data List', TopologyTemplateService.name);
    let body = res.json();
    let topologyTemplateList: TopologyTemplate[] = [];
    Logger.info('[RESPONSE][LEVELGRAPH]: ' + JSON.stringify(body), TopologyTemplateService.name);
    for (let topologytemplate of body) {
      let tempTopologyTemplate: TopologyTemplate = new TopologyTemplate(topologytemplate.name);
      tempTopologyTemplate.setId(topologytemplate.id);
      topologyTemplateList.push(tempTopologyTemplate);

    }

    return topologyTemplateList || {};

  }

  private extractTopologyTemplate(res: Response) {
     Logger.info('Extract Level Graph Data', TopologyTemplateService.name);
    let body = res.json();
    Logger.info('[RESPONSE][LEVELGRAPH]: ' + JSON.stringify(body), TopologyTemplateService.name);
    let topologyTemplate: TopologyTemplate = new TopologyTemplate(body.name);
    topologyTemplate.setId(body.id);
    return topologyTemplate || {};
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
