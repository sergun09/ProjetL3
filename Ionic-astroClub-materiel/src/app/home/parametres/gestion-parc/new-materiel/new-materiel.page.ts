import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { InventairePost } from 'src/entity/InventairePost';
import { TypeMateriel } from 'src/entity/TypeMateriel';
import { InventairesService } from 'src/services/inventaires.service';
import { TypeMaterielService } from 'src/services/type-materiel.service';

@Component({
  selector: 'app-new-materiel',
  templateUrl: './new-materiel.page.html',
  styleUrls: ['./new-materiel.page.scss'],
})
export class NewMaterielPage implements OnInit {

  typeMateriels : Array<TypeMateriel> = Array();
  newMat : InventairePost = {
    typeMateriel: '',
    intitule: '',
    description: '',
    kit: '',
    conditionnement: '',
    etat: '',
    emprunt: '',
    montantCaution: 0,
    commentaire: '',
    enMaintenance: false,
  };

  constructor(
    private typeMatService: TypeMaterielService,
    private loadingCrtl: LoadingController,
    private navCtrl: NavController,
    private inventaireService: InventairesService
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl =>
      {
        loadingEl.present();
          this.typeMatService.getAllTypeMat().subscribe(response => {
            this.typeMateriels= response;
            loadingEl.dismiss();
      })
      }
    )
  }

  onSubmitMat(form : NgForm){
    if (Number(form.value.enMaintenance) === 0) {
      this.newMat.enMaintenance = false;
    }else{
      this.newMat.enMaintenance = true;
    }
    this.newMat.typeMateriel= '/api/type_materiels/'+(form.value.typeMateriel).toString();
    this.newMat.intitule= form.value.intitule;
    this.newMat.description= form.value.description;
    this.newMat.kit= form.value.kit;
    this.newMat.conditionnement= form.value.conditionnement;
    this.newMat.etat= form.value.etat;
    this.newMat.emprunt= form.value.emprunt;
    this.newMat.montantCaution= Number(form.value.caution);
    this.loadingCrtl.create({keyboardClose : true , message : 'Veuillez patienter...'}).then(loadingEl => {
      loadingEl.present();
      this.inventaireService.createInventaire(this.newMat).subscribe(()=>{
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/home/parametres/gestion-parc');
      });
    });
  }

}
