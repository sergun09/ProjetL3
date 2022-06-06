import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Inventaire } from 'src/entity/Inventaire';
import { InventairesService } from 'src/services/inventaires.service';

@Component({
  selector: 'app-resultat-recherche',
  templateUrl: './resultats-recherche.page.html',
  styleUrls: ['./resultats-recherche.page.scss'],
})
export class InventairesPage implements OnInit {

  public inventaires: Array<Inventaire> = new Array();

  constructor(public inventairesService: InventairesService, private loadingCrtl: LoadingController) {}

  ngOnInit() {
    //this.inventairesService.getAllInventaires().subscribe((response) => {this.inventaires = response});
  }

  ionViewWillEnter(){
  /*   if (this.inventairesService.inventairesByFilter.length===0) {
      this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl =>{
        loadingEl.present();
        this.inventairesService.getAllInventaires().subscribe((response) => {
        this.inventaires = response;
        loadingEl.dismiss();
      });
      })
    } */
      this.inventaires = this.inventairesService.inventairesByFilter;


  }

  deleteInventaire(idInv: number) {
    this.inventairesService.deleteInventaireFromId(idInv)
  }

}
