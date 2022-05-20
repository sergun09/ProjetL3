import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/entity/User';
import { UserLogin } from 'src/entity/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private server: string = "http://localhost:5000/api";

  constructor(private http: HttpClient) { }

  public loginUser(adherent: UserLogin): Observable<boolean> {
    return this.http.post(this.server + "/login",
      adherent,
      {
        withCredentials: true,
        observe: 'response',
        responseType: 'json',
        headers: new HttpHeaders().set("Access-Control-Allow-Origin", "*")
          .set("Content-Type", 'application/json')
          .set("Access-Control-Allow-Credentials", "true")
      })
      .pipe(map((response) => response.status === 201))
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(this.server + "/me",
      {
        observe: 'body',
        responseType: 'json',
        withCredentials: true,
        headers: new HttpHeaders().set("Content-Type", 'application/json')
          .set("Access-Control-Allow-Credentials", "true")
          .set("Access-Control-Allow-Origin", "*")
      })
  }

  public GetSession(): string {
    return JSON.parse(localStorage.getItem("user"));
  }
}
