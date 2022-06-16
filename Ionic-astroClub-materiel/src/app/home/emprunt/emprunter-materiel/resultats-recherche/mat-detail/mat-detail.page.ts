import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Emprunt } from 'src/entity/emprunt';
import { Inventaire } from 'src/entity/Inventaire';
import { AdherentsService } from 'src/services/adherents.service';
import { EmpruntService } from 'src/services/emprunt.service';
import { InventairesService } from 'src/services/inventaires.service';
import { EmpruntMotifComponent } from './emprunt-motif/emprunt-motif.component';

@Component({
  selector: 'app-mat-detail',
  templateUrl: './mat-detail.page.html',
  styleUrls: ['./mat-detail.page.scss'],
})
export class MatDetailPage implements OnInit {

  public inventaire: Inventaire = new Inventaire();
  public emprunts : Array<Emprunt> = new Array();

  constructor(
    private inventaireService: InventairesService,
    private empruntService : EmpruntService,
    private loadingCrtl: LoadingController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private adherentService : AdherentsService,
    private modalCtrl: ModalController,
    private navCtrl: NavController) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.route.paramMap.subscribe(paramMap =>{
      if (!paramMap.has('materielId')) {
        this.navCtrl.navigateBack('/home/emprunt/emprunter-materiel/resultats-recherche');
        return;
      }
      this.inventaireService.getOneInventaire(Number(paramMap.get('materielId'))).subscribe(response => {
        this.inventaire = response;
        loadingEl.dismiss();
      })
      })
    })
  }

  onEmprunt(){
    this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
      loadingEl.present();
      this.empruntService.getEmpruntsByMat('/api/materiels/'+((this.inventaire.id).toString())).subscribe(response => {
        this.emprunts = response;
        if (this.emprunts.length === 0) {
           loadingEl.dismiss();
           this.modalCtrl.create({component: EmpruntMotifComponent, componentProps : {selectedMat: this.inventaire.id}}).then(modalEl => {
           modalEl.present();
          })
        }else if (new Date() >= new Date(this.emprunts[0].datedebut) && new Date() <= new Date(this.emprunts[0].datefin)) {

          console.log(new Date());
          console.log(new Date(this.emprunts[0].datedebut));

          loadingEl.dismiss();
          this.alertCtrl.create({
          header: 'Attention !!!',
          message: this.inventaire.intitule+' est réservé par '+this.emprunts[0].adherent?.nom+', du '+new Date(this.emprunts[0].datedebut).toLocaleString()+' à '+new Date(this.emprunts[0].datefin).toLocaleString()+', pour '+this.emprunts[0].motif,
          buttons: ['OK']
        }).then(alertEl => {
            alertEl.present();
          })
        }else if (new Date() < new Date(this.emprunts[0].datedebut)) {
          loadingEl.dismiss();
          this.alertCtrl.create({
          header: 'Attention !!!',
          message: this.inventaire.intitule+" devra etre rendu pour le "+new Date(this.emprunts[0].datedebut).toLocaleString()+". "+this.emprunts[0].adherent?.nom+" l'a réservé pour "+this.emprunts[0].motif,
          buttons: [
            {
              text: 'ok',
              handler: () => {
                this.modalCtrl.create({component: EmpruntMotifComponent, componentProps : {selectedMat: this.inventaire.id}}).then(modalEl => {
                modalEl.present();
              })
              }
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        }).then(alertEl => {
            alertEl.present();
          })
        }else{
          loadingEl.dismiss();
          this.alertCtrl.create({
          header: 'Attention !!!',
          message: this.inventaire.intitule+' est réservé par '+this.emprunts[0].adherent?.nom+' pour '+this.emprunts[0].motif,
          buttons: ['OK']
        }).then(alertEl => {
            alertEl.present();
          })
        }
      })
    })

  }

}
