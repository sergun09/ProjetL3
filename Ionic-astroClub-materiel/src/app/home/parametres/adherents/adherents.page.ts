import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonItemSliding, LoadingController } from '@ionic/angular';
import { User } from 'src/entity/User';
import { AdherentsService } from 'src/services/adherents.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { UserPost } from 'src/entity/UserPost';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-adherents',
  templateUrl: './adherents.page.html',
  styleUrls: ['./adherents.page.scss'],
})
export class AdherentsPage implements OnInit {

  adherents: Array<User> = new Array();
  ready: boolean;

  constructor(public adherentService: AdherentsService,
    private actionSheetCrtl: ActionSheetController,
    private loadingCrtl: LoadingController,
    private ngxCsvParser: NgxCsvParser) {
    this.ready = false;
  }

  ngOnInit() {
    // this.adherentService.getAllUsers().subscribe((response) =>
    // {
    //   this.adherents = response;
    //   this.ready = true;
    // });

  }

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  fileChangeListener($event) : void
  {
    const files = $event.srcElement.files;

    this.loadingCrtl.create({ keyboardClose: true, message: 'Importation en cours...' }).then(loadingEl => 
      {
        loadingEl.present();
        this.ngxCsvParser.parse(files[0], { header: true, delimiter: ',' })
          .pipe().subscribe({
            next: (result): void => {
              //let s = result[0] as String[]
              for(var n of result[0] as string[]) 
              { 
                //console.log(n) 
                console.log("Fichier à lire : ", result)
                console.log('Creation User');
                const userN:  UserPost =
                {
                  uuid: "",
                  password: "",
                  nom: "",
                  roles: new Array()
                }
                const uuid = uuidv4();
                userN.nom = n;
                userN.uuid = uuid.toString();
                userN.password = uuid.toString();
                userN.roles = ["ROLE_USER"]
                this.adherentService.createUser(userN).subscribe(() => 
                {
                  console.log("Creation User terminée")
                  loadingEl.dismiss();
                })
              }
            },
            error: (error: NgxCSVParserError): void => {
              console.log('Error', error);
            }
          });
      })
  }

  export() : void
  {
    if(this.ready == true)
    {
      var options = { 
        fieldSeparator: ',',
        quoteStrings: "",
        decimalseparator: '.',
        showLabels: false, 
        showTitle: true,
        title: '',
        useBom: true,
        noDownload: false,
        headers: []
      };
      let b = new ngxCsv(this.adherents.map(adh => adh.nom), "Liste des adhérents", options);
      //console.log(b.getCsv().replace('"',''))
    }
    else
    {
      alert("Attendez que la liste des adhérents soit chargée !")
    }
   
  }
  ionViewWillEnter() {
    this.adherentService.getAllUsers().subscribe((response) => {
      this.adherents = response;
      this.ready = true;
    });
  }

  deleteUser(idAdh: number, slidingEl: IonItemSliding) {
    this.actionSheetCrtl.create({
      header: 'ETES-VOUS SUR DE VOULOIR LE SUPPRIMER ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
              loadingEl.present();
              this.adherentService.deleteUserFromId(idAdh).subscribe(() => {
                this.adherents = this.adherents.filter((adherent) => adherent.id !== idAdh);
                loadingEl.dismiss();
                slidingEl.close();
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
