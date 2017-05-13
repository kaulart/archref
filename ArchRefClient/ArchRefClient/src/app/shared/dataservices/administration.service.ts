
import { Logger } from '../../../logger/logger';
import { Repository } from '../datamodel/repository';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AdministrationService {

   private repositoriesUrl = '/api/repositories';

   constructor(private http: Http) { }

   //GET
   public getRepositories(): Observable<Repository[]> {
        Logger.info('Send GET Repositories Request', AdministrationService.name);
        return this.http.get(this.repositoriesUrl).map(this.extractRepositoryDataList).catch(this.handleError);
   }

   public getRepository(id: number): Observable<Repository> {

    Logger.info('Send GET Repository Request with ID:' + id, AdministrationService.name);
    return this.http.get(this.repositoriesUrl + '/' + id)
                    .map(this.extractRepositoryData)
                    .catch(this.handleError);
  }

   //CREATE
   public addRepository(repository: Repository): Observable<Repository> {

    Logger.info('Send POST Repository Request', AdministrationService.name);
    Logger.data(JSON.stringify(repository), AdministrationService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.repositoriesUrl, repository, options)
                    .map(this.extractRepositoryData)
                    .catch(this.handleError);
  }

  //DELETE
  public deleteRepository(id: number): Observable<Repository> {
    Logger.info('Send DELETE Repository Request with ID: ' + id, AdministrationService.name);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.repositoriesUrl + '/' + id , options)
                    .map(res => res)
                    .catch(this.handleError);
  }

  private extractRepositoryDataList(res: Response) {
    Logger.info('Extract Data of Response Body', AdministrationService.name);

    let body = res.json();
    let repoList: Repository[] = [];

    Logger.data('[RESPONSE][REPOSITORIES]: ' + JSON.stringify(body), AdministrationService.name);

    for (let repository of body) {

        let tempRepository: Repository = new Repository(repository.name);
        tempRepository.id = repository.id;
        tempRepository.id = repository.id;
        tempRepository.nodeTypeList =  repository.nodeTypeList;
        tempRepository.relationshipTypeList = repository.relationshipTypeList;
        repoList.push(tempRepository);

    }

    return repoList || { };
  }

  private extractRepositoryData(res: Response) {
    Logger.info('Extract Data of Response Body', AdministrationService.name);
    let body = res.json();
    Logger.data('[RESPONSE][REPOSITORY]: ' + JSON.stringify(body), AdministrationService.name);
    let rep: Repository = new Repository(body.name);
    rep.id = body.id;
    rep.nodeTypeList =  body.nodeTypeList;
    rep.relationshipTypeList = body.relationshipTypeList;
    return rep || { };
  }

  private handleError(error: Response | any)  {
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
