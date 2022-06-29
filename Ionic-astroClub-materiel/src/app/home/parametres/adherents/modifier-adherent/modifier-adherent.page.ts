import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { User } from 'src/entity/User';
import { UserPost } from 'src/entity/UserPost';
import { AdherentsService } from 'src/services/adherents.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-modifier-adherent',
  templateUrl: './modifier-adherent.page.html',
  styleUrls: ['./modifier-adherent.page.scss'],
})
export class ModifierAdherentPage implements OnInit {
  adherent : User = new User

  user: UserPost =
  {
    uuid: "",
    password: "",
    nom: "",
    roles: null
  }
constructor(private adherentService: AdherentsService,
   private loadingCrtl: LoadingController,
   private navCtrl: NavController,
   private route: ActivatedRoute) { }

ngOnInit() {
}
ionViewWillEnter(){
  this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
    loadingEl.present();
    this.route.paramMap.subscribe(paramMap =>{
    if (!paramMap.has('modifier-adherent')) {
      this.navCtrl.navigateBack('/home/parametres/adherents');
      return;
    }
    this.adherentService.getOneUser(Number(paramMap.get('modifier-adherent'))).subscribe(response => {
      this.adherent= response;
      loadingEl.dismiss();
    })
    })
  })
}

update(nom: string): void {
  const uuid = uuidv4();
  if (nom !== null ) {
    this.user.nom = nom;
    this.user.uuid = uuid.toString();
    this.user.password = uuid.toString();
    this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
      loadingEl.present();
      this.adherentService.modifierUser(this.adherent.id,nom, uuid.toString(),uuid.toString()).subscribe(() => {
        loadingEl.dismiss();
      }
      );
    });
  }
}
}
