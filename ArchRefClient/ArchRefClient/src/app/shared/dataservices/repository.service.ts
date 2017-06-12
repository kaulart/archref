import { Logger } from '../../../logger/logger';
import { Repository } from '../datamodels/repository';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/********************************************************************************************************************
 *
 * @service RepositoryService  - Implements the calls to the rest interface of the application server and
 *                               handle the request construction and response extraction for Repository data
 *
 ********************************************************************************************************************/
@Injectable()
export class RepositoryService {

  // URL of the REST Interface End-Point
  private repositoriesUrl = '/api/repositories';

  constructor(private http: Http) { }

  /******************************************************************************************************************
   *
   * @request - Send GET all Repositories REQUEST
   *
   ******************************************************************************************************************/
  public getRepositories(): Observable<Repository[]> {
    Logger.info('[REQUEST - REPOSITORY] Send GET Repositories Request', RepositoryService.name);
    return this.http.get(this.repositoriesUrl).map(this.extractRepositoryDataList).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send GET Repository REQUEST
   *
   ******************************************************************************************************************/
  public getRepository(id: number): Observable<Repository> {
    Logger.info('[REQUEST - REPOSITORY] Send GET Repository Request with ID:' + id, RepositoryService.name);
    return this.http.get(this.repositoriesUrl + '/' + id).map(this.extractRepositoryData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send POST Repository REQUEST
   *
   ******************************************************************************************************************/
  public createRepository(repository: Repository): Observable<Repository> {
    Logger.info('[REQUEST - REPOSITORY] Send POST Repository Request', RepositoryService.name);
    Logger.data('[REQUEST - REPOSITORY]' + JSON.stringify(repository), RepositoryService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.repositoriesUrl, repository, options).map(this.extractRepositoryData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send PUT Repository REQUEST
   *
   ******************************************************************************************************************/
  public updateRepository(repository: Repository): Observable<Repository> {
    Logger.info('[REQUEST - REPOSITORY] Send PUT Request Repository', RepositoryService.name);
    Logger.data('[REQUEST - REPOSITORY] ' + JSON.stringify(repository), RepositoryService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.repositoriesUrl + '/' + repository.id, repository, options).map(this.extractRepositoryData).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @request - Send DELETE Repository REQUEST
   *
   ******************************************************************************************************************/
  public deleteRepository(id: number): Observable<Repository> {
    Logger.info('[REQUEST - REPOSITORY] Send DELETE Repository Request with ID: ' + id, RepositoryService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.repositoriesUrl + '/' + id, options).map(res => res).catch(this.handleError);
  }

  /******************************************************************************************************************
   *
   * @response - Extract data from response data list
   *
   ******************************************************************************************************************/
  private extractRepositoryDataList(res: Response) {

    let body = res.json();
    let repoList: Repository[] = [];
    Logger.info('[RESPONSE - REPOSITORIES]: Extract Data of Response Body', RepositoryService.name);
    Logger.data('[RESPONSE - REPOSITORIES]: ' + JSON.stringify(body), RepositoryService.name);
    for (let repository of body) {
      let tempRepository: Repository = new Repository();
      tempRepository.id = repository.id;
      tempRepository.name = repository.name;
      tempRepository.nodeTypeList = repository.nodeTypeList;
      tempRepository.relationshipTypeList = repository.relationshipTypeList;
      repoList.push(tempRepository);
    }
    return repoList || {};
  }

  /******************************************************************************************************************
   *
   *  @response - Extract data from response data object
   *
   ******************************************************************************************************************/
  private extractRepositoryData(res: Response) {

    let body = res.json();
    Logger.info('[RESPONSE - REPOSITORY]: Extract Data of Response Body', RepositoryService.name);
    Logger.data('[RESPONSE - REPOSITORY]: ' + JSON.stringify(body), RepositoryService.name);
    let rep: Repository = new Repository();
    rep.id = body.id;
    rep.name = body.name;
    rep.nodeTypeList = body.nodeTypeList;
    rep.relationshipTypeList = body.relationshipTypeList;
    return rep || {};
  }

  /******************************************************************************************************************
   *
   *  @error - Error Handling
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
