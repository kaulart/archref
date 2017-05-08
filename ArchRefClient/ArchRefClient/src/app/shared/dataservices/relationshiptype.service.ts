
import { RelationshipType } from '../relationshiptype';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class RelationshipTypeService {

  private relationshipTypeUrl = '/api/relationshiptype';

  constructor(private http: Http) { }

  public getRelationshipTypes(): Observable<RelationshipType[]> {
    alert("GET RELATIONTYPE REQUEST SEND");
   return this.http.get(this.relationshipTypeUrl)
                    .map(this.extractRelationshipTypesDataList)
                    .catch(this.handleError);
  }


   public createRelationshipType(relationshipType: RelationshipType): Observable<RelationshipType> {
    alert('POST RelationshipType RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.relationshipTypeUrl, relationshipType, options)
                    .map(this.extractRelationshipTypeData)
                    .catch(this.handleError);
  }

  public deleteRelationshipType(id: string): Observable<RelationshipType> {
    alert('DELETE RelationshiupType RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.relationshipTypeUrl + '/' + id, options)
                    .map(res => res)
                    .catch(this.handleError);
  }

  public extractRelationshipTypesDataList(res) {

       let body = res.json();
       let relationshipTypeList: RelationshipType[] = [];
       alert("BODyDATA RELATION" + JSON.stringify(body));

       for (let relationshipType of body) {

        let tempRelationshipType: RelationshipType = new RelationshipType(relationshipType.name, relationshipType.repository);
        tempRelationshipType.id =  relationshipType.id;
        relationshipTypeList.push(tempRelationshipType);

    }

    return relationshipTypeList || { };

  }

   private extractRelationshipTypeData(res: Response) {
    let body = res.json();
    let relationshipType: RelationshipType = new RelationshipType(body.name, body.repository);
       alert("BODyDATA ITeM RELATION" + JSON.stringify(body));
    relationshipType.id = body.id; 
    return relationshipType || { };
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
