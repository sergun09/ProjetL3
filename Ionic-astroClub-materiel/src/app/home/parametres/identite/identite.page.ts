import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
  constructor(private authService: AuthService, private loadingCrtl: LoadingController) { }

  ngOnInit() {
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
            alert("User recupéré")
            localStorage.setItem("user", JSON.stringify(this.user))
            console.log(JSON.parse(localStorage.getItem("user")) as User);
            var m = JSON.parse(localStorage.getItem("user")) as User
            console.log("User log : " + m.nom);
            console.log("User log : " + m.roles);

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
      alert("Vous êtes déjà connecté !")
    }
  }
}
