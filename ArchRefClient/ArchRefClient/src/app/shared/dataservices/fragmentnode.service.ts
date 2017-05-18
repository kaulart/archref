import { Logger } from '../../../logger/logger';
import { FragmentNode } from '../datamodel/levelgraphmodel/fragmentnode';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class FragmentNodeService {

  private fragmentnodesUrl = '/api/fragmentnodes';

  constructor(private http: Http) { }

  //GET
  public getFragmentNodes(): Observable<FragmentNode[]> {
    Logger.info('Send GET FragmentNodes Request', FragmentNodeService.name);
    return this.http.get(this.fragmentnodesUrl).map(this.extractFragmentNodeDataList).catch(this.handleError);
  }

  public getFragmentNode(id: number): Observable<FragmentNode> {

    Logger.info('Send GET FragmentNode Request with ID:' + id, FragmentNodeService.name);
    return this.http.get(this.fragmentnodesUrl + '/' + id)
      .map(this.extractFragmentNodeData)
      .catch(this.handleError);
  }

  //CREATE
  public createFragmentNode(fragmentNode: FragmentNode): Observable<FragmentNode> {

    Logger.info('Send POST FragmentNode Request', FragmentNodeService.name);
    Logger.data(JSON.stringify(fragmentNode), FragmentNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.fragmentnodesUrl, fragmentNode, options)
      .map(this.extractFragmentNodeData)
      .catch(this.handleError);
  }

  //UPDATE
  public updateFragmentNode(fragmentNode: FragmentNode): Observable<FragmentNode> {
    Logger.info('Send PUT Request FragmentNode', FragmentNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.fragmentnodesUrl, fragmentNode, options)
      .map(this.extractFragmentNodeData)
      .catch(this.handleError);
  }


  //DELETE
  public deleteFragmentNode(id: number): Observable<FragmentNode> {
    Logger.info('Send DELETE Repository Request with ID: ' + id, FragmentNodeService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.fragmentnodesUrl + '/' + id, options)
      .map(res => res)
      .catch(this.handleError);
  }

  private extractFragmentNodeDataList(res: Response) {
    Logger.info('Extract Data of Response Body', FragmentNodeService.name);

    let body = res.json();
    let fragmetnNodesList: FragmentNode[] = [];

    Logger.data('[RESPONSE][FragmentNodes]: ' + JSON.stringify(body), FragmentNodeService.name);

    for (let fragmentNode of body) {

      let tempFragmentNode: FragmentNode = new FragmentNode();
      tempFragmentNode.setId(fragmentNode.id);
      fragmetnNodesList.push(tempFragmentNode);

    }

    return fragmetnNodesList || {};
  }

  private extractFragmentNodeData(res: Response) {
    Logger.info('Extract Data of Response Body', FragmentNodeService.name);
    let body = res.json();
    Logger.data('[RESPONSE][FragmetnNode]: ' + JSON.stringify(body), FragmentNodeService.name);
    let fragmentNode: FragmentNode = new FragmentNode();
    fragmentNode.setId(body.id);
    return fragmentNode || {};
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
