import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypeMateriel } from 'src/entity/TypeMateriel';

@Injectable({
  providedIn: 'root'
})
export class TypeMaterielService {

  private server: string = "http://localhost:5000/api/type_materiels";

  constructor( private http: HttpClient) { }

  public getAllTypeMat(): Observable<Array<TypeMateriel>> {
    return this.http.get<TypeMateriel>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(map((data) => data['hydra:member']))
  }


  public getOneTypeMat(id: number): Observable<TypeMateriel> {
    return this.http.get<TypeMateriel>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
  }

  public createTypeMat(typeMat: TypeMateriel): Observable<boolean> {
    return this.http.post(this.server,
      typeMat,
      {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(map((response) => response.status === 201))
  }

  public deleteTypeMatFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server + "/" + id.toString(),
      { observe: 'response', responseType: 'json' })
      .pipe(map((response) => response.status === 204))
  }

}
