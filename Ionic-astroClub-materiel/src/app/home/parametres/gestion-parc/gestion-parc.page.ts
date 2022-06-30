import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonItemSliding, LoadingController } from '@ionic/angular';
import { ngxCsv } from 'ngx-csv';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Inventaire } from 'src/entity/Inventaire';
import { InventaireExport } from 'src/entity/InventaireExport';
import { InventairePost } from 'src/entity/InventairePost';
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
    private typeMatService : TypeMaterielService,
    private ngxCsvParser: NgxCsvParser
    ) {
    this.ready= false;
  }

  ngOnInit() {
  }

  inventairesExport : Array<InventaireExport> = new Array();
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
        headers: ["typeMateriel","intitule","description","kit","conditionnement","etat","emprunt","montantCaution","commentaire","enMaintenance",]
      };
      this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl =>
        {
          loadingEl.present()
          this.inventaires.map(mat =>
            {
              this.typeMatService.getOneTypeMat(Number(String(mat.typeMateriel).split("/")[3])).subscribe(typeMat =>
              {
                this.typeMateriel = typeMat
                console.log(this.typeMateriel)
                this.inventairesExport.push(new InventaireExport(this.typeMateriel?.nom, mat.intitule, mat.description, mat.kit, mat.conditionnement, mat.etat,
                mat.emprunt, mat.montantCaution, mat.commentaire, mat.enMaintenance))
                new ngxCsv(this.inventairesExport, "ListeMateriaux", options)
                loadingEl.dismiss()
              })
            })

        })
    }
    else
    {
      alert("Attendez que la liste soit chargée !")
    }
  }

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  fileChangeListener($event) : void
  {
    const files = $event.srcElement.files;
    this.ngxCsvParser.parse(files[0], { header: true, delimiter: ',' })
      .pipe().subscribe(
        {
          next : (result) : void =>
          {
            let idTypeMat = 0;
            for(let inv of result as InventaireExport[])
            {
              const invPost:  InventairePost =
              {
                intitule: "",
                description: "",
                kit: "",
                conditionnement: "",
                etat: "",
                emprunt: "",
                montantCaution: 0,
                commentaire: "",
                enMaintenance: false,
                typeMateriel: "",
              }
              invPost.intitule = inv.intitule
              invPost.description = inv.description
              invPost.kit = inv.kit
              invPost.conditionnement = inv.kit
              invPost.etat = inv.etat
              invPost.emprunt = inv.emprunt
              invPost.montantCaution = Number(inv.montantCaution)
              invPost.commentaire = inv.commentaire

              if ( String (inv.enMaintenance) === 'FALSE') {
                invPost.enMaintenance = false;
              }
              if ( String (inv.enMaintenance) === 'TRUE'){
                invPost.enMaintenance = true;
              }

                this.loadingCrtl.create({ keyboardClose: true, message: 'Importation en cours...' }).then(loadingEl =>{
                  loadingEl.present()
                  this.typeMatService.getAllTypeMat().subscribe(typeMatTab =>
                    {
                      typeMatTab.forEach(typeMat =>
                        {
                          if(typeMat.nom === inv.typeMateriel)
                          {
                            invPost.typeMateriel = '/api/type_materiels/'+typeMat.id.toString()
                            this.inventaireService.createInventaire(invPost).subscribe(() =>
                            {
                              console.log("Création Matériaux terminée")

                            })
                          }
                        })
                        loadingEl.dismiss();
                    })
                })
          }
        },
              error: (error: NgxCSVParserError): void => {
                console.log('Error', error);
              }
  })


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
