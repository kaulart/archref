import { Repository } from '../repository';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdministrationService {
//    let headers = new Headers();
//    headers.append('Accept', 'application/xml');
   private repositoriesUrl = '/api/repositories';

   constructor(private http: Http) { }

   public getRepositories(): Observable<Repository[]> {

        return this.http.get(this.repositoriesUrl).map(this.extractRepositoriesListData).catch(this.handleError);
   }

   public addRepository(repository: Repository): Observable<Repository> {
    alert('POST RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.repositoriesUrl, repository, options)
                    .map(this.extractRepositoryData)
                    .catch(this.handleError);
  }

  public deleteRepository(name: String): Observable<Repository> {
    alert('DELETE RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.repositoriesUrl + '/' + name , options)
                    .map(res => res)
                    .catch(this.handleError);
  }

  private extractRepositoriesListData(res: Response) {

    let body = res.json();
    let repoList: Repository[] = [];

    for (let repository of body) {
        let tempRepository: Repository = new Repository(repository.name);
        repoList.push(tempRepository);
    }

    return repoList || { };
  }

  private extractRepositoryData(res: Response) {
    let body = res.json();
    alert(body.name);
    let rep: Repository = new Repository(body.name);
       alert(rep);
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
