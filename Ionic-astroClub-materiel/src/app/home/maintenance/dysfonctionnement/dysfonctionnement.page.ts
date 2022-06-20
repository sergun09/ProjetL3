import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Dysfonctionnement } from 'src/entity/dysfonctionnement';
import { DysfonctionnementService } from 'src/services/dysfonctionnement.service';

@Component({
  selector: 'app-dysfonctionnement',
  templateUrl: './dysfonctionnement.page.html',
  styleUrls: ['./dysfonctionnement.page.scss'],
})
export class DysfonctionnementPage implements OnInit {

  dysfonctionnements: Array<Dysfonctionnement> = new Array()

  constructor(
    private loadingCrtl: LoadingController,
    private dysfonctionnementService: DysfonctionnementService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl =>
      {
        loadingEl.present();
        this.dysfonctionnementService.getAllDysfonctionnements().subscribe(response => {
          this.dysfonctionnements = response;
            loadingEl.dismiss();
        })
      }
    )
  }

}
