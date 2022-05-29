import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reparation } from 'src/entity/reparation';
import { ReparationPost } from 'src/entity/reparationPost';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {

  private server: string = "http://localhost:5000/api/reparations";

  constructor(private http: HttpClient) { }

  public getAllReparations(): Observable<Array<Reparation>> {
    return this.http.get<Reparation>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(map((data) => data['hydra:member']))
  }


  public getOneReparation(id: number): Observable<Reparation> {
    return this.http.get<Reparation>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
  }

  public createReparation(reparation: ReparationPost): Observable<boolean> {
    return this.http.post(this.server,
      reparation,
      {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(map((response) => response.status === 201))
  }

  public modifierReparation(id: number, rep: ReparationPost): Observable<boolean>{
    return this.http.put(this.server+'/'+id,
      rep,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200));
  }

  public deleteReparationFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server + "/" + id.toString(),
      { observe: 'response', responseType: 'json' })
      .pipe(map((response) => response.status === 204))
  }

}
