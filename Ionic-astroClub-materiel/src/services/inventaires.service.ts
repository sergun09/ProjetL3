import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inventaire } from 'src/entity/Inventaire';
import { InventairePost } from 'src/entity/InventairePost';

@Injectable({
  providedIn: 'root'
})
export class InventairesService {

  public inventairesByFilter: Array<Inventaire> = new Array();

  private server: string = "http://localhost:5000/api/materiels";

  constructor(private http: HttpClient) { }

  public getAllInventaires(): Observable<Array<Inventaire>> {
    return this.http.get<Inventaire>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(map((data) => data['hydra:member']))
  }

  public getInventairesByFilter(selectedEtat: string, selectedIntitule: string, selectedType: string, selectedEmprunt: string): Observable<Array<Inventaire>> {
    let params= new HttpParams();
    if(selectedEmprunt !== '' && selectedEmprunt !== null){
      params = params.append('emprunt',selectedEmprunt);
    }
    if(selectedEtat !== '' && selectedEtat !== null){
      params = params.append('etat',selectedEtat);
    }
    if(selectedIntitule !== '' && selectedIntitule !== null){
      params = params.append('intitule',selectedIntitule);
    }
    if(selectedType !== '/api/type_materiels/' && selectedType !== null){
      params = params.append('typeMateriel',selectedType);
    }

    return this.http.get<Inventaire>(this.server,
      { observe: 'body', responseType: 'json', params : params})
      .pipe(map((data) => data['hydra:member']))
  }


  public getOneInventaire(id: number): Observable<Inventaire> {
    return this.http.get<Inventaire>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
  }

  public createInventaire(inventaire: InventairePost): Observable<boolean> {
    return this.http.post(this.server,
      inventaire,
      {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(map((response) => response.status === 201))
  }

  public modifierInventaire(id: number, mat: InventairePost): Observable<boolean>{
    return this.http.put(this.server+'/'+id,
      mat,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200));
  }

  public deleteInventaireFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server + "/" + id.toString(),
      { observe: 'response', responseType: 'json' })
      .pipe(map((response) => response.status === 204))
  }
}
