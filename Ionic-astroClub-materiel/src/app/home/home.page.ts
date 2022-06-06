import { Component } from '@angular/core';
import { User } from 'src/entity/User';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public user : User;

  constructor(private authService :AuthService) {}

  ionViewWillEnter(){
    this.user = this.authService.getUserSession();
  }
}
