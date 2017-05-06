import { NodeType } from '../nodetype';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class NodeTypeService {

  private repositoriesUrl = '/api/nodeTypes';

  constructor(private http: Http) { }

  public getNodeTypes(): Observable<NodeType[]> {

   alert('GET NodeType RequestSend');

   return this.http.get(this.repositoriesUrl)
                    .map(this.extractNodeTypesData)
                    .catch(this.handleError);
  }


   public addRepository(name: NodeType): Observable<NodeType> {
    alert('POST NodeType RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.repositoriesUrl, JSON.stringify(name), options)
                    .map(this.extractNodeTypesData)
                    .catch(this.handleError);
  }

  public deleteNodeType(nodeTypeName: String, repositoryName): Observable<NodeType> {
    alert('DELETE NodeType RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.repositoriesUrl + '/' + nodeTypeName + '/' +  repositoryName, options)
                    .map(res => res)
                    .catch(this.handleError);
  }

  public extractNodeTypesData() {

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
