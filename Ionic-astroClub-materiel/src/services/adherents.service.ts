import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/entity/User';
import { UserPost } from 'src/entity/UserPost';

@Injectable({
  providedIn: 'root'
})
export class AdherentsService {

  private server: string = "http://localhost:5000/api/users";

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<Array<User>> {
    return this.http.get<User>(this.server,
      {
        observe: 'body', responseType: 'json',
        headers: new HttpHeaders().set("Access-Control-Allow-Origin", "*")
          .set("Content-Type", 'application/json')
          .set("Access-Control-Allow-Credentials", "true")
      })
      .pipe(map((data) => data['hydra:member']))
  }


  public getOneUser(id: number): Observable<User> {
    return this.http.get<User>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
  }

  public createUser(adherent: UserPost): Observable<boolean> {
    return this.http.post(this.server,
      adherent,
      {
        observe: 'response',
        responseType: 'json'
      })
      .pipe(map((response) => response.status === 201))
  }

  public modifierUser(id: number, nom: string, uuid: string, password : string): Observable<boolean>{
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = {'Content-Type': 'application/merge-patch+json'};
    return this.http.patch(this.server+'/'+id,
    {nom , uuid, password},
    {headers,observe: 'response', responseType: 'json'})
    .pipe(map((response)=>response.status===200));
  }

  public deleteUserFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server + "/" + id.toString(),
      { observe: 'response', responseType: 'json' })
      .pipe(map((response) => response.status === 204))
  }
}
