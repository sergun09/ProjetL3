import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonItemSliding, LoadingController } from '@ionic/angular';
import { ngxCsv } from 'ngx-csv';
import { Inventaire } from 'src/entity/Inventaire';
import { InventaireExport } from 'src/entity/InventaireExport';
import { TypeMateriel } from 'src/entity/TypeMateriel';
import { InventairesService } from 'src/services/inventaires.service';
import { TypeMaterielService } from 'src/services/type-materiel.service';

@Component({
  selector: 'app-gestion-parc',
  templateUrl: './gestion-parc.page.html',
  styleUrls: ['./gestion-parc.page.scss'],
})

export class GestionParcPage implements OnInit {

  inventaires: Array<Inventaire> = new Array()
  ready : boolean;
  searchTerm : string;

  typeMateriel : TypeMateriel;

  constructor(private inventaireService: InventairesService,
    private actionSheetCtrl: ActionSheetController,
    private loadingCrtl : LoadingController,
    private typeMatService : TypeMaterielService
    ) {
    this.ready= false;
  }

  ngOnInit() {
  }

  export() : void
  {
    if(this.ready)
    {
      var options = {
        fieldSeparator: ',',
        quoteStrings: "",
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: '',
        useBom: true,
        noDownload: false,
        headers: []
      };
      // let s = this.inventaires.map(mat =>

      //     new InventaireExport(mat.typeMateriel.nom, mat.intitule, mat.description, mat.kit, mat.conditionnement, mat.etat,
      //       mat.emprunt, mat.montantCaution, mat.commentaire, mat.enMaintenance)
      //   );
      console.log(this.inventaires)
      let newLists = this.inventaires.map(mat =>
        {
          const id = Number(String(mat.typeMateriel).split("/")[3])
          this.typeMatService.getOneTypeMat(id).subscribe(typeMat => this.typeMateriel = typeMat)
          console.log(this.typeMateriel)
          return new InventaireExport(this.typeMateriel?.nom, mat.intitule, mat.description, mat.kit, mat.conditionnement, mat.etat,
          mat.emprunt, mat.montantCaution, mat.commentaire, mat.enMaintenance)
        }
      )
      let b = new ngxCsv( newLists, "Liste des matériaux", options);
      //console.log(b.getCsv().replace('"',''))
    }
    else
    {
      alert("Attendez que la liste soit chargée !")
    }
  }

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  fileChangeListener($event) : void
  {
    console.log("Import du matériels")
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
