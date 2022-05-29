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
  newMat : InventairePost = {
    typeMateriel: '',
    intitule: '',
    description: '',
    kit: '',
    conditionnement: '',
    etat: '',
    emprunt: '',
    montantCaution: 0,
    commentaire:'',
    enMaintenance: false,
  };
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
      this.reparationService.createReparation(this.newRep).subscribe();
      this.inventaireService.getOneInventaire(form.value.materiel).subscribe(response => {
        this.materiel= response;

        this.newMat.typeMateriel= '/api/type_materiels/'+(this.materiel.typeMateriel?.id).toString();
        this.newMat.intitule= this.materiel.intitule;
        this.newMat.description= this.materiel.description;
        this.newMat.kit= this.materiel.kit;
        this.newMat.conditionnement= this.materiel.conditionnement;
        this.newMat.etat= this.materiel.etat;
        this.newMat.emprunt= this.materiel.emprunt;
        this.newMat.commentaire= this.materiel.commentaire;
        this.newMat.montantCaution= this.materiel.montant_caution;
        this.newMat.enMaintenance=true;

        this.inventaireService.modifierInventaire(this.materiel.id,this.newMat).subscribe(()=>{
          loadingEl.dismiss();
          this.navCtrl.navigateBack('/home/maintenance');
        });
      });
    });
  }
}
