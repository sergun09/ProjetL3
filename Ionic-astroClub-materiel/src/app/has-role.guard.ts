import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/entity/User';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var user = JSON.parse(localStorage.getItem("user")) as User
    if (user == null)
      alert("Veuillez vous connecter ! ")
    const auth = user.roles.includes(route.data.role);
    if (!auth)
      alert("Seul l'administrateur peut accéder à ce menu !")

    return auth;
  }

}
