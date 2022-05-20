import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { UserPost } from 'src/entity/UserPost';
import { AdherentsService } from 'src/services/adherents.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-nouvel-adherent',
  templateUrl: './nouvel-adherent.page.html',
  styleUrls: ['./nouvel-adherent.page.scss'],
})
export class NouvelAdherentPage implements OnInit {

  user: UserPost =
    {
      uuid: "",
      password: "",
      nom: ""
    }
  constructor(private adherentService: AdherentsService, private loadingCrtl: LoadingController , private navCrtl: NavController) { }

  ngOnInit() {
  }

  create(nom: string): void {
    const uuid = uuidv4();
    if (nom !== null) {
      this.user.nom = nom;
      this.user.uuid = uuid.toString();
      this.user.password = uuid.toString();
      this.loadingCrtl.create({keyboardClose : true , message : 'Veuillez patienter...'}).then(loadingEl => {
        loadingEl.present();
        this.adherentService.createUser(this.user).subscribe(()=>{
          loadingEl.dismiss();
          this.navCrtl.navigateBack('/home/parametres/adherents');
        });
      });
    }
  }
}
