import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { Dysfonctionnement } from 'src/entity/dysfonctionnement';
import { ReparationPost } from 'src/entity/reparationPost';
import { DysfonctionnementService } from 'src/services/dysfonctionnement.service';
import { ReparationService } from 'src/services/reparation.service';

@Component({
  selector: 'app-dysfonctionnement-det',
  templateUrl: './dysfonctionnement-det.page.html',
  styleUrls: ['./dysfonctionnement-det.page.scss'],
})
export class DysfonctionnementDetPage implements OnInit {

  dysfonctionnement : Dysfonctionnement= new Dysfonctionnement();
  date:string;
  newRep : ReparationPost = {
    nom: '',
    description: '',
    materiel: '',
  };

  constructor(
    private loadingCrtl:LoadingController,
    private route: ActivatedRoute,
    private navCtrl:NavController,
    private dysfonctionnementService: DysfonctionnementService,
    private actionSheetCrtl :ActionSheetController,
    private reparationService: ReparationService
      ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.route.paramMap.subscribe(paramMap =>{
      if (!paramMap.has('dysfonctionnementId')) {
        this.navCtrl.navigateBack('/home/maintenance/dysfonctionnement');
        return;
      }
      this.dysfonctionnementService.getOneDysfonctionnement(Number(paramMap.get('dysfonctionnementId'))).subscribe(response => {
        this.dysfonctionnement = response;
        this.date=new Date(this.dysfonctionnement.date).toLocaleString();
        loadingEl.dismiss();
      })
      })
    })
  }

  onDelete(id : number){
    this.actionSheetCrtl.create({
      header: 'ETES-VOUS SUR DE VOULOIR ANNULER LE SIGNALEMENT ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
              loadingEl.present();
              this.dysfonctionnementService.deleteDysfonctionnementFromId(id).subscribe(() => {
                loadingEl.dismiss();
                this.navCtrl.navigateBack('/home/maintenance/dysfonctionnement');
              })
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  onValide(){
    this.newRep.materiel= '/api/materiels/'+(this.dysfonctionnement.materiel?.id).toString();
    this.newRep.nom= 'Reparation du materiel '+(this.dysfonctionnement.materiel?.intitule).toString();
    this.newRep.description= this.dysfonctionnement.description;
    this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
      loadingEl.present();
      this.reparationService.createReparation(this.newRep).subscribe(() => {
        this.dysfonctionnementService.deleteDysfonctionnementFromId(this.dysfonctionnement.id).subscribe(() => {
          loadingEl.dismiss();
          this.navCtrl.navigateBack('/home/maintenance/dysfonctionnement');
        })
      });
    })
  }

}
