import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { User } from 'src/entity/User';
import { UserLogin } from 'src/entity/UserLogin';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-identite',
  templateUrl: './identite.page.html',
  styleUrls: ['./identite.page.scss'],
})
export class IdentitePage implements OnInit {

  userLogin: UserLogin =
    {
      "uuid": "",
      "password": ""
    };
  user: User =
    {
      id: 0,
      uuid: "",
      password: "",
      nom: "",
      roles: new Array()
    }
    userConnecte : User;
  constructor(private authService: AuthService,
    private loadingCrtl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl : NavController
    ) { }

  ngOnInit() {
  }

  public IsLogin() : boolean
  {
    return localStorage.length != 0;
  }

  login(uuid: string) {
    if (localStorage.getItem("user") == null) {
      this.userLogin.uuid = uuid;
      this.userLogin.password = uuid;
      this.loadingCrtl.create({ keyboardClose: true, message: 'Connexion en cours...' }).then(loadingEl => {
        loadingEl.present();
        this.authService.loginUser(this.userLogin).subscribe(() => {
          this.authService.getUser().subscribe((u) => {
            this.user = u;
            this.alertCtrl.create({
              header: 'Connexion réussie !',
              message: "Vous êtes connecté ! ",
              buttons: ['OK']
            }).then(alertEl => {
                alertEl.present();
              })
            localStorage.setItem("user", JSON.stringify(this.user))
            console.log(JSON.parse(localStorage.getItem("user")) as User);
            var m = JSON.parse(localStorage.getItem("user")) as User
            console.log("User log : " + m.nom);
            console.log("User log : " + m.roles);
            this.navCtrl.navigateBack('/home');
            loadingEl.dismiss();
          }, (error) => console.log(error))
        },
          (error) => {
            console.error("Erreur POST : " + error)
          }
        );
      });
    }
    else {
      this.alertCtrl.create({
        header: 'Attention !!!',
        message: "Vous êtes déjà connecté ! ",
        buttons: ['OK']
      }).then(alertEl => {
          alertEl.present();
        })
    }
  }
  ionViewWillEnter(){
    this.userConnecte = this.authService.getUserSession();
  }

  logout() : void
  {
    localStorage.removeItem("user")
  }
}
