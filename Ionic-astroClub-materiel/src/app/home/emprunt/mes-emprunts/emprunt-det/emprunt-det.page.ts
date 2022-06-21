import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Emprunt } from 'src/entity/emprunt';
import { EmpruntService } from 'src/services/emprunt.service';
import { DescriptionComponent } from './description/description.component';
import { DisfonctionnementComponent } from './disfonctionnement/disfonctionnement.component';


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

  onDisfct(){
    this.modalCtrl.create({component: DisfonctionnementComponent,componentProps : {selectedMat : this.emprunt.materiel?.id}}).then(modalEl => {
      modalEl.present();
    })
  }

  onRender(id : number){
    this.actionSheetCrtl.create({
      header: 'ETES-VOUS SUR DE VOULOIR RENDRE LE MATERIEL ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
              loadingEl.present();
              this.empruntService.deleteEmpruntFromId(id).subscribe(() => {
                loadingEl.dismiss();
                this.navCtrl.navigateBack('/home/emprunt/emprunts-tiers');
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

}

