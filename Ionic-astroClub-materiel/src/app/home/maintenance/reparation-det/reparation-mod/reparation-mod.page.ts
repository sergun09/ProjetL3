import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Reparation } from 'src/entity/reparation';
import { ReparationPost } from 'src/entity/reparationPost';
import { ReparationService } from 'src/services/reparation.service';

@Component({
  selector: 'app-reparation-mod',
  templateUrl: './reparation-mod.page.html',
  styleUrls: ['./reparation-mod.page.scss'],
})
export class ReparationModPage implements OnInit {

  reparation: Reparation = new Reparation();
  newRep : ReparationPost = {
    nom: '',
    description: '',
    materiel: '',
  };

  constructor(
    private reparationService: ReparationService,
    private loadingCrtl: LoadingController,
    private navCtrl: NavController,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.route.paramMap.subscribe(paramMap =>{
      if (!paramMap.has('reparationId')) {
        this.navCtrl.navigateBack('/home/parametres/gestion-parc');
        return;
      }
      this.reparationService.getOneReparation(Number(paramMap.get('reparationId'))).subscribe(response => {
        this.reparation = response;
        loadingEl.dismiss();
      })
      })
    })
  }

   onSubmitRep(form : NgForm){
    this.newRep.materiel= '/api/materiels/'+(this.reparation.materiel?.id).toString();
    this.newRep.nom= form.value.nom;
    this.newRep.description= form.value.description;
    this.loadingCrtl.create({keyboardClose : true , message : 'Veuillez patienter...'}).then(loadingEl => {
      loadingEl.present();
      this.reparationService.modifierReparation(this.reparation.id,this.newRep).subscribe(()=>{
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/home/maintenance');
      });
    });
  }
}
