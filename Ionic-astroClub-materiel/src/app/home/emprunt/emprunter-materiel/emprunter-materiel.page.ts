import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Inventaire } from 'src/entity/Inventaire';
import { TypeMateriel } from 'src/entity/TypeMateriel';
import { InventairesService } from 'src/services/inventaires.service';
import { TypeMaterielService } from 'src/services/type-materiel.service';

@Component({
  selector: 'app-emprunter-materiel',
  templateUrl: './emprunter-materiel.page.html',
  styleUrls: ['./emprunter-materiel.page.scss'],
})
export class EmprunterMaterielPage implements OnInit {

  public inventaires: Array<Inventaire> = new Array();
  public typeMateriels : Array<TypeMateriel> = Array();
  public etat = '';
  public type = '';
  public intitule = '';
  public emprunt = '';

  constructor(
    private inventairesService: InventairesService,
    private loadingCrtl: LoadingController,
    private typeMatService : TypeMaterielService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.typeMatService.getAllTypeMat().subscribe((response) => {
        this.typeMateriels = response;
      })
      this.inventairesService.getAllInventaires().subscribe((response) => {
      this.inventaires = response;
      loadingEl.dismiss();
    });

    })
  }

  onSubmit(form : NgForm){
    this.emprunt = form.value.emprunt;
    this.etat = form.value.etat;
    this.intitule = form.value.intitule;
    if (form.value.type === null) {
      this.type ='/api/type_materiels/';
    }else{
      this.type ='/api/type_materiels/'+(form.value.type).toString();
    }

    this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl =>{
     loadingEl.present();
     this.inventairesService.getInventairesByFilterEmprunt(this.etat,this.intitule,this.type,this.emprunt).subscribe((response) => {
     this.inventairesService.inventairesByFilter = response;
     loadingEl.dismiss();
     this.navCtrl.navigateForward('/home/emprunt/emprunter-materiel/resultats-recherche');
     });
   })
   }
}
