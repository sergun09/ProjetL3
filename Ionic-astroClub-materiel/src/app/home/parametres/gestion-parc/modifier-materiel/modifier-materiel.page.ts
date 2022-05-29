import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Inventaire } from 'src/entity/Inventaire';
import { InventairePost } from 'src/entity/InventairePost';
import { TypeMateriel } from 'src/entity/TypeMateriel';
import { InventairesService } from 'src/services/inventaires.service';
import { TypeMaterielService } from 'src/services/type-materiel.service';

@Component({
  selector: 'app-modifier-materiel',
  templateUrl: './modifier-materiel.page.html',
  styleUrls: ['./modifier-materiel.page.scss'],
})
export class ModifierMaterielPage implements OnInit {

  mat: Inventaire = new Inventaire();
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
    enMaintenance: this.mat.en_maintenance,
  };

  constructor(
    private typeMatService: TypeMaterielService,
    private loadingCrtl: LoadingController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private inventaireService: InventairesService) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.route.paramMap.subscribe(paramMap =>{
      if (!paramMap.has('materielId')) {
        this.navCtrl.navigateBack('/home/parametres/gestion-parc');
        return;
      }
      this.typeMatService.getAllTypeMat().subscribe(response => {
        this.typeMateriels= response;
      })
      this.inventaireService.getOneInventaire(Number(paramMap.get('materielId'))).subscribe(response => {
        this.mat = response;
        loadingEl.dismiss();
      })
      })
    })
  }

  onSubmitMat(form : NgForm){
    this.newMat.typeMateriel= '/api/type_materiels/'+(form.value.typeMateriel).toString();
    this.newMat.intitule= form.value.intitule;
    this.newMat.description= form.value.description;
    this.newMat.kit= form.value.kit;
    this.newMat.conditionnement= form.value.conditionnement;
    this.newMat.etat= form.value.etat;
    this.newMat.emprunt= form.value.emprunt;
    this.newMat.commentaire= form.value.commentaire;
    this.newMat.montantCaution= Number(form.value.caution);
    this.loadingCrtl.create({keyboardClose : true , message : 'Veuillez patienter...'}).then(loadingEl => {
      loadingEl.present();
      this.inventaireService.modifierInventaire(this.mat.id,this.newMat).subscribe(()=>{
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/home/parametres/gestion-parc');
      });
    });
  }

}
