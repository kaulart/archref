import { NodeType } from '../nodetype';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class NodeTypeService {

  private nodetypeUrl = '/api/nodetype';

  constructor(private http: Http) { }

  public getNodeTypes(): Observable<NodeType[]> {
    alert("GET NODETYPE REQUEST SEND");
   return this.http.get(this.nodetypeUrl)
                    .map(this.extractNodeTypesDataList)
                    .catch(this.handleError);
  }


   public createNodeType(nodeType: NodeType): Observable<NodeType> {
    alert('POST NodeType RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
     alert(JSON.stringify(nodeType));
    return this.http.post(this.nodetypeUrl, nodeType, options)
                    .map(this.extractNodeTypesData)
                    .catch(this.handleError);
  }

  public deleteNodeType(id: string): Observable<NodeType> {
    alert('DELETE NodeType RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.nodetypeUrl + '/' + id, options)
                    .map(res => res)
                    .catch(this.handleError);
  }

  public extractNodeTypesDataList(res) {

       let body = res.json();
       let nodeTypeList: NodeType[] = [];
       alert("BODY DATA ARRRAY NODETYPE" + JSON.stringify(body));
       for (let nodeType of body) {

           let tempNodeType: NodeType = new NodeType(nodeType.name, nodeType.repositoryId);
           tempNodeType.id = nodeType.id;
           nodeTypeList.push(tempNodeType);

       }

    return nodeTypeList || { };

  }
  
   private extractNodeTypesData(res: Response) {
    let body = res.json();
      alert("BODY DATA ITEM NODETYPE" + JSON.stringify(body));
    let nodeType: NodeType = new NodeType(body.name, body.repositoryId);
     nodeType.id = body.id;
    return nodeType || { };
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
