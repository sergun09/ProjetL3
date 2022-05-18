import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Inventaire } from 'src/entity/Inventaire';
import {ReservationService} from "../../../../services/reservation.service";

@Component({
  selector: 'app-resultat-recherche',
  templateUrl: './resultats-recherche.page.html',
  styleUrls: ['./resultats-recherche.page.scss'],
})
export class ReservationPage implements OnInit {

  public inventaires: Array<Inventaire> = new Array();

  constructor(public reservationService: ReservationService, private loadingCrtl: LoadingController) {}

  ngOnInit() {
    //this.inventairesService.getAllInventaires().subscribe((response) => {this.inventaires = response});
  }

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.reservationService.getAllInventaires().subscribe((response) => {
      this.inventaires = response;
      loadingEl.dismiss();
    });

    })

  }

  deleteInventaire(idInv: number) {
    this.reservationService.deleteInventaireFromId(idInv)
  }

}
