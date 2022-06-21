import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dysfonctionnement } from 'src/entity/dysfonctionnement';
import { DysfonctionnementPost } from 'src/entity/dysfonctionnementPost';

@Injectable({
  providedIn: 'root'
})
export class DysfonctionnementService {

  private server: string = "http://localhost:5000/api/dysfonctionnements";

  constructor( private http: HttpClient) { }

  public getAllDysfonctionnements(): Observable<Array<Dysfonctionnement>> {
    return this.http.get<Dysfonctionnement>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(map((data) => data['hydra:member']))
  }


  public getOneDysfonctionnement(id: number): Observable<Dysfonctionnement> {
    return this.http.get<Dysfonctionnement>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
  }

  public createDysfonctionnement(dysfct: DysfonctionnementPost): Observable<boolean> {
    return this.http.post(this.server,
      dysfct,
      {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(map((response) => response.status === 201))
  }

  public deleteDysfonctionnementFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server + "/" + id.toString(),
      { observe: 'response', responseType: 'json' })
      .pipe(map((response) => response.status === 204))
  }

}
