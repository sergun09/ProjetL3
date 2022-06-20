import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Inventaire } from 'src/entity/Inventaire';
import { InventairePost } from 'src/entity/InventairePost';
import { ReparationPost } from 'src/entity/reparationPost';
import { InventairesService } from 'src/services/inventaires.service';
import { ReparationService } from 'src/services/reparation.service';

@Component({
  selector: 'app-nouvelle-reparation',
  templateUrl: './nouvelle-reparation.page.html',
  styleUrls: ['./nouvelle-reparation.page.scss'],
})
export class NouvelleReparationPage implements OnInit {

  materiels: Array<Inventaire> = Array();
  materiel: Inventaire;
  newRep : ReparationPost = {
    nom: '',
    description: '',
    materiel: '',
  };

  constructor(
    private reparationService: ReparationService,
    private loadingCrtl: LoadingController,
    private navCtrl: NavController,
    private inventaireService:InventairesService
    ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl =>
      {
        loadingEl.present();
          this.inventaireService.getAllInventaires().subscribe(response => {
            this.materiels= response;
            loadingEl.dismiss();
        })
      }
    )
  }

   onSubmitRep(form : NgForm){
    this.newRep.materiel= '/api/materiels/'+(form.value.materiel).toString();
    this.newRep.nom= form.value.nom;
    this.newRep.description= form.value.description;
    this.loadingCrtl.create({keyboardClose : true , message : 'Veuillez patienter...'}).then(loadingEl => {
      loadingEl.present();
      this.reparationService.createReparation(this.newRep).subscribe(() => {
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/home/maintenance');
      });

    });
  }
}
