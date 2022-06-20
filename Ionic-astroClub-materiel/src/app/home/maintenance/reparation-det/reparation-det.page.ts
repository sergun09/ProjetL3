import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { Inventaire } from 'src/entity/Inventaire';
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
  inventaire :  Inventaire  = new Inventaire();

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
        this.inventaireService.getOneInventaire(this.reparation.materiel?.id).subscribe(response=>{
          this.inventaire=response;
          loadingEl.dismiss();
        })
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
            this.inventaireService.modifierInventaireEnMaintenance(this.reparation.materiel?.id, true).subscribe();
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

  onChangeEtat(){
    if (this.inventaire.enMaintenance === false) {
      this.actionSheetCtrl.create({
      header : "CE MATERIEL NE POURRA PLUS ETRE EMPRUNTE, NI RESERVE",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl => {
              loadingEl.present();
              this.inventaireService.modifierInventaireEnMaintenance(this.reparation.materiel?.id, true).subscribe(() => {
              loadingEl.dismiss();
              this.navCtrl.navigateBack('/home/maintenance');
            })
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
    }else{
      this.actionSheetCtrl.create({
        header : "CE MATERIEL POURRA ETRE EMPRUNTE ET RESERVE DE NOUVEAU",
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl => {
                loadingEl.present();
                this.inventaireService.modifierInventaireEnMaintenance(this.reparation.materiel?.id, false).subscribe(() => {
                loadingEl.dismiss();
                this.navCtrl.navigateBack('/home/maintenance');
              })
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

}
