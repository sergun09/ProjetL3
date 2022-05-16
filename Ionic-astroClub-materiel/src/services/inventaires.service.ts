import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inventaire } from 'src/entity/Inventaire';
import { UserPost } from 'src/entity/UserPost';

@Injectable({
  providedIn: 'root'
})
export class InventairesService {

  private server: string = "http://localhost:5000/api/materiels";

  constructor(private http: HttpClient) { }

  public getAllInventaires(): Observable<Array<Inventaire>> {
    return this.http.get<Inventaire>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(map((data) => data['hydra:member']))
  }


  public getOneInventaire(id: number): Observable<Inventaire> {
    return this.http.get<Inventaire>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
  }

  public createInventaire(inventaire: Inventaire): Observable<boolean> {
    return this.http.post(this.server,
      inventaire,
      {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(map((response) => response.status === 201))
  }

  public deleteInventaireFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server + "/" + id.toString(),
      { observe: 'response', responseType: 'json' })
      .pipe(map((response) => response.status === 204))
  }
}
