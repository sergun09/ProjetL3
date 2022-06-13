import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { Reparation } from 'src/entity/reparation';
import { InventairesService } from 'src/services/inventaires.service';
import { ReparationService } from 'src/services/reparation.service';

@Component({
  selector: 'app-reparation-det',
  templateUrl: './reparation-det.page.html',
  styleUrls: ['./reparation-det.page.scss'],
})
export class ReparationDetPage implements OnInit {

  public reparation: Reparation = new Reparation();

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private loadingCrtl : LoadingController,
    private route: ActivatedRoute,
    private inventaireService: InventairesService ,
    private reparationService: ReparationService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.route.paramMap.subscribe(paramMap =>{
      if (!paramMap.has('reparationId')) {
        this.navCtrl.navigateBack('/home/maintenance');
        return;
      }
      this.reparationService.getOneReparation(Number(paramMap.get('reparationId'))).subscribe(response => {
        this.reparation = response;
        loadingEl.dismiss();
      })
      })
    })
  }

  onDeleteRep(id : number){
    this.actionSheetCtrl.create({
      header : "ETES-VOUS SUR QUE C'EST DEJA REPARER ?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl => {
              loadingEl.present();
              this.reparationService.deleteReparationFromId(id).subscribe(() => {
              loadingEl.dismiss();
              this.navCtrl.navigateBack('/home/maintenance');
            })
            this.inventaireService.modifierInventaireEnMaintenance(this.reparation.materiel?.id, false).subscribe();
            })
          }
        },
        {
          text : 'Cancel',
          role : 'cancel'
        }
      ]
    }).then(actionSheetEl=>{
      actionSheetEl.present();
    });
  }

}
