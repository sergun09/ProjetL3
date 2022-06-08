import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Emprunt } from 'src/entity/emprunt';
import { EmpruntService } from 'src/services/emprunt.service';
import { DescriptionComponent } from './description/description.component';


@Component({
  selector: 'app-emprunt-det',
  templateUrl: './emprunt-det.page.html',
  styleUrls: ['./emprunt-det.page.scss'],
})
export class EmpruntDetPage implements OnInit {

  public emprunt: Emprunt = new Emprunt();
  public dateDebut  :string;
  public dateFin  :string;

  constructor(
    private empruntService: EmpruntService,
    private loadingCrtl: LoadingController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCrtl : ActionSheetController
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.route.paramMap.subscribe(paramMap =>{
      if (!paramMap.has('empruntId')) {
        this.navCtrl.navigateBack('/home/emprunt/mes-emprunts');
        return;
      }
      this.empruntService.getOneEmprunt(Number(paramMap.get('empruntId'))).subscribe(response => {
        this.emprunt = response;

        this.dateDebut = new Date(this.emprunt.datedebut).toLocaleString();
        this.dateFin = new Date(this.emprunt.datefin).toLocaleString();

        loadingEl.dismiss();
      })
      })
    })
  }

  onDescMod(){
this.modalCtrl.create({component: DescriptionComponent,componentProps : {selectedMat : this.emprunt.materiel?.id}}).then(modalEl => {
  modalEl.present();
})
  }

  onRender(){
    this.actionSheetCrtl.create({
      header: 'ETES-VOUS SUR DE VOULOIR RENDRE LE MATERIEL ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
              loadingEl.present();
              /* this.adherentService.deleteUserFromId(idAdh).subscribe(() => {
                this.adherents = this.adherents.filter((adherent) => adherent.id !== idAdh); */
                loadingEl.dismiss();
              // })
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

}

