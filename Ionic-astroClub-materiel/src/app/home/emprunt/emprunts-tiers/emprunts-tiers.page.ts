import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Emprunt } from 'src/entity/emprunt';
import { EmpruntService } from 'src/services/emprunt.service';

@Component({
  selector: 'app-emprunts-tiers',
  templateUrl: './emprunts-tiers.page.html',
  styleUrls: ['./emprunts-tiers.page.scss'],
})
export class EmpruntsTiersPage implements OnInit {

  emprunts: Array<Emprunt> = new Array();

  constructor(
    private empruntService: EmpruntService,
    private loadingCrtl: LoadingController
    ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl =>
      {
        loadingEl.present();
        this.empruntService.getAllEmprunts().subscribe(response => {
          this.emprunts = response;
            loadingEl.dismiss();
        })
      }
    )
  }

}
