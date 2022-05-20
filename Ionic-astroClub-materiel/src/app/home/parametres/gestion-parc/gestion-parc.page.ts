import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonItemSliding, LoadingController } from '@ionic/angular';
import { Inventaire } from 'src/entity/Inventaire';
import { InventairesService } from 'src/services/inventaires.service';

@Component({
  selector: 'app-gestion-parc',
  templateUrl: './gestion-parc.page.html',
  styleUrls: ['./gestion-parc.page.scss'],
})
export class GestionParcPage implements OnInit {

  inventaires: Array<Inventaire> = new Array()
  ready : boolean;

  constructor(private inventaireService: InventairesService,
    private actionSheetCtrl: ActionSheetController,
    private loadingCrtl : LoadingController
    ) {
    this.ready= false;
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.inventaireService.getAllInventaires().subscribe(response => {
      this.inventaires = response;
      this.ready= true;
    })
  }

  onDeleteMat(id : number, slidingEl: IonItemSliding){
    this.actionSheetCtrl.create({
      header : 'ETES-VOUS SUR DE VOULOIR LE SUPPRIMER ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl => {
              loadingEl.present();
              this.inventaireService.deleteInventaireFromId(id).subscribe(() => {
                this.inventaires= this.inventaires.filter((inventaire) => inventaire.id !== id)
                loadingEl.dismiss();
                slidingEl.close();
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
