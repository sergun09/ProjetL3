import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transfert } from 'src/entity/transfert';
import { TransfertPost } from 'src/entity/transfertPost';

@Injectable({
  providedIn: 'root'
})
export class TransfertService {

  private server: string = "http://localhost:5000/api/transferts";

  constructor( private http: HttpClient) { }

  public getAllTransferts(): Observable<Array<Transfert>> {
    return this.http.get<Transfert>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(map((data) => data['hydra:member']))
  }


  public getTransfertsByEmetteur(user: string): Observable<Array<Transfert>> {
    let params= new HttpParams();
    if(user !== '' && user !== null){
      params = params.append('emetteur',user);
    }

    return this.http.get<Transfert>(this.server,
      { observe: 'body', responseType: 'json', params : params})
      .pipe(map((data) => data['hydra:member']))
  }

  public getTransfertsByRecepteur(user: string): Observable<Array<Transfert>> {
    let params= new HttpParams();
    if(user !== '' && user !== null){
      params = params.append('recepteur',user);
    }

    return this.http.get<Transfert>(this.server,
      { observe: 'body', responseType: 'json', params : params})
      .pipe(map((data) => data['hydra:member']))
  }

  public getOneTransfert(id: number): Observable<Transfert> {
    return this.http.get<Transfert>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
  }

  public createTransfert(dysfct: TransfertPost): Observable<boolean> {
    return this.http.post(this.server,
      dysfct,
      {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(map((response) => response.status === 201))
  }

  public deleteTransfertFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server + "/" + id.toString(),
      { observe: 'response', responseType: 'json' })
      .pipe(map((response) => response.status === 204))
  }
}
