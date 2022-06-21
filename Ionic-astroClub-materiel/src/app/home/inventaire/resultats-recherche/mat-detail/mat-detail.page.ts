import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Inventaire } from 'src/entity/Inventaire';
import { InventairesService } from 'src/services/inventaires.service';
import { DisfonctionnementComponent } from './disfonctionnement/disfonctionnement.component';

@Component({
  selector: 'app-mat-detail',
  templateUrl: './mat-detail.page.html',
  styleUrls: ['./mat-detail.page.scss'],
})
export class MatDetailPage implements OnInit {

  public inventaire: Inventaire = new Inventaire();

  constructor(
    private inventaireService: InventairesService,
    private loadingCrtl: LoadingController,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private navCtrl: NavController) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(paramMap =>{
    //   if (!paramMap.has('materielId')) {
    //     this.navCtrl.navigateBack('/home/inventaire/resultats-recherche');
    //     return;
    //   }
    //   //this.inventaire = this.inventaireService.getMateriel(Number(paramMap.get('materielId')));
    // })
  }
  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.route.paramMap.subscribe(paramMap =>{
      if (!paramMap.has('materielId')) {
        this.navCtrl.navigateBack('/home/inventaire/resultats-recherche');
        return;
      }
      this.inventaireService.getOneInventaire(Number(paramMap.get('materielId'))).subscribe(response => {
        this.inventaire = response;
        loadingEl.dismiss();
      })
      })
    })
  }

  onDisfct(){
    this.modalCtrl.create({component: DisfonctionnementComponent,componentProps : {selectedMat : this.inventaire.id}}).then(modalEl => {
      modalEl.present();
    })
  }

}
