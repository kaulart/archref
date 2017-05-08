
import { LevelGraph } from '../levelgraph';
import { NodeType } from '../nodetype';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class LevelGraphService {

  private levelGraphUrl = '/api/levelgraph';

  constructor(private http: Http) { }

  public getLevelGraphs(): Observable<LevelGraph[]> {

    return this.http.get(this.levelGraphUrl)
                    .map(this.extractLevelGraphDataList)
                    .catch(this.handleError);

  }

  public getLevelGraph(id: string): Observable<LevelGraph> {
    return this.http.get(this.levelGraphUrl + '/' + id)
                    .map(this.extractLevelGraph)
                    .catch(this.handleError);
  }

   public createLevelGraph(levelGraph: LevelGraph): Observable<LevelGraph> {
    alert('POST LEVELGRAPH RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.levelGraphUrl, levelGraph, options)
                    .map(this.extractLevelGraph)
                    .catch(this.handleError);
  }
//
//   public updateLevelGraph(levelGraph: LevelGraph): Observable<LevelGraph> {
//    alert('POST LEVELGRAPH RequestSend');
//    let headers = new Headers({ 'Content-Type': 'application/json' });
//    let options = new RequestOptions({ headers: headers });
//    return this.http.post(this.levelGraphUrl, levelGraph, options)
//                    .map(this.extractNodeTypesData)
//                    .catch(this.handleError);
//  }
//
  public deleteLevelGraph(id: string): Observable<LevelGraph> {
    alert('DELETE NodeType RequestSend');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.levelGraphUrl + '/' + id, options)
                    .map(res => res)
                    .catch(this.handleError);
  }

  public extractLevelGraphDataList(res) {

       let body = res.json();
       let levelGraphList: LevelGraph[] = [];
       alert(JSON.stringify(body));
       for (let levelGraph of body) {
        let tempLevelGraph: LevelGraph = new LevelGraph(levelGraph.name, levelGraph.id, levelGraph.numberOfLevels);
        levelGraphList.push(tempLevelGraph);

    }

    return levelGraphList || { };

  }

   private extractLevelGraph(res: Response) {
    let body = res.json();
    alert(JSON.stringify(body));
    let levelGraph: LevelGraph = new LevelGraph(body.name, body.id, body.numberOfLevels);
    return levelGraph || { };
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
