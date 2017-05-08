import { Repository } from '../repository';
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
        alert("SEND GET ALL REPOSITORIES REQUEST");
        return this.http.get(this.repositoriesUrl).map(this.extractRepositoryDataList).catch(this.handleError);
   }

   public getRepository(id: number): Observable<Repository> {
     
     alert("SEND GET REPOSITORY ID REQUEST");
    return this.http.get(this.repositoriesUrl + '/' + id)
                    .map(this.extractRepositoryData)
                    .catch(this.handleError);
  }

   //CREATE
   public addRepository(repository: Repository): Observable<Repository> {
     
   
     alert("SEND CREATE REPOSITORY REQUEST");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.repositoriesUrl, repository, options)
                    .map(this.extractRepositoryData)
                    .catch(this.handleError);
  }

  //DELETE
  public deleteRepository(id: string): Observable<Repository> {
     alert("SEND DELETE REPOSITORY ID REQUEST");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.repositoriesUrl + '/' + id , options)
                    .map(res => res)
                    .catch(this.handleError);
  }

  private extractRepositoryDataList(res: Response) {

    let body = res.json();
    let repoList: Repository[] = [];
    alert("BODY DATA OF ARRAY \n" + JSON.stringify(body));
    for (let repository of body) {

        let tempRepository: Repository = new Repository(repository.name);
        tempRepository.id = repository.id;
        tempRepository.id = repository.id;
        tempRepository.nodeTypeList =  repository.nodeTypeList;
        tempRepository.relationshipTypeList = repository.relationTypeList;
        repoList.push(tempRepository);

    }

    return repoList || { };
  }

  private extractRepositoryData(res: Response) {
    let body = res.json();
      alert("BODY DATA OF ITEM \n" + JSON.stringify(body));
    let rep: Repository = new Repository(body.name);
    rep.id = body.id;
    rep.nodeTypeList =  body.nodeTypeList;
    rep.relationshipTypeList = body.relationTypeList;
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
