import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Emprunt } from 'src/entity/emprunt';
import { EmpruntPost } from 'src/entity/empruntPost';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {

  private server: string = "http://localhost:5000/api/emprunts";

  constructor(private http: HttpClient) { }

  public getAllEmprunts(): Observable<Array<Emprunt>> {
    return this.http.get<Emprunt>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(map((data) => data['hydra:member']))
  }

  public getEmpruntsByFilter(user: string): Observable<Array<Emprunt>> {
    let params= new HttpParams();
    if(user !== '' && user !== null){
      params = params.append('adherent',user);
    }

    return this.http.get<Emprunt>(this.server,
      { observe: 'body', responseType: 'json', params : params})
      .pipe(map((data) => data['hydra:member']))
  }


  public getOneEmprunt(id: number): Observable<Emprunt> {
    return this.http.get<Emprunt>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
  }

  public createEmprunt(emprunt: EmpruntPost): Observable<boolean> {
    return this.http.post(this.server,
      emprunt,
      {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(map((response) => response.status === 201))
  }

  public modifierEmprunt(id: number, emprunt: EmpruntPost): Observable<boolean>{
    return this.http.put(this.server+'/'+id,
    emprunt,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200));
  }

  public deleteEmpruntFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server + "/" + id.toString(),
      { observe: 'response', responseType: 'json' })
      .pipe(map((response) => response.status === 204))
  }
}
