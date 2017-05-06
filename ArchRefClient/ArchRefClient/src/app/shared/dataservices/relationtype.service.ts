import { RelationType } from '../relationtype';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class RelationTypeService {

  private repositoriesUrl = '/api/relationTypes';

  constructor(private http: Http) { }

  public getRelationTypes(): Observable<RelationType[]> {

   alert('GET RequestSend');

   return this.http.get(this.repositoriesUrl)
                    .map(this.extractRelationTypesData)
                    .catch(this.handleError);
  }


   public getNodeTypes(): Observable<RelationType[]> {

   alert('GET NodeType RequestSend');

   return this.http.get(this.repositoriesUrl)
                    .map(this.extractRelationTypesData)
                    .catch(this.handleError);
  }


   public addRepository(relationType: RelationType): Observable<RelationType> {
    alert('POST NodeType RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.repositoriesUrl, JSON.stringify(name), options)
                    .map(this.extractRelationTypesData)
                    .catch(this.handleError);
  }

  public deleteNodeType(relationTypeName: String, repositoryName: String): Observable<RelationType> {
    alert('DELETE NodeType RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.repositoriesUrl + '/' + relationTypeName + '/' +  repositoryName, options)
                    .map(res => res)
                    .catch(this.handleError);
  }

  public extractRelationTypesData() {

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
