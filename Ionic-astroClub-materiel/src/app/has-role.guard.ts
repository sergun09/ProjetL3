import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/entity/User';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(
    private alertCtrl: AlertController) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var user = JSON.parse(localStorage.getItem("user")) as User
    if (user == null){
       this.alertCtrl.create({
      header: 'Attention !!!',
      message: "Veuillez vous connecter ! ",
      buttons: ['OK']
    }).then(alertEl => {
        alertEl.present();
      })
    }
    const auth = user.roles.includes(route.data.role);
    if (!auth){
        this.alertCtrl.create({
      header: 'Attention !!!',
      message: "Seul l'administrateur peut accéder à ce menu !",
      buttons: ['OK']
    }).then(alertEl => {
        alertEl.present();
      })
    }

    return auth;
  }

}
