import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Emprunt } from 'src/entity/emprunt';
import { User } from 'src/entity/User';
import { AuthService } from 'src/services/auth.service';
import { EmpruntService } from 'src/services/emprunt.service';

@Component({
  selector: 'app-mes-emprunts',
  templateUrl: './mes-emprunts.page.html',
  styleUrls: ['./mes-emprunts.page.scss'],
})
export class MesEmpruntsPage implements OnInit {

  emprunts: Array<Emprunt> = new Array()
  public user : User;

  constructor(
    private empruntService: EmpruntService,
    private loadingCrtl: LoadingController,
    private authService: AuthService
    ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.user = this.authService.getUserSession();
    this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl =>
      {
        loadingEl.present();
        this.empruntService.getEmpruntsByFilter('/api/users/'+((this.user.id).toString())).subscribe(response => {
          this.emprunts = response;
            loadingEl.dismiss();
        })
      }
    )
  }

}
