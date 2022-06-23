import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonItemSliding, LoadingController, NavController } from '@ionic/angular';
import { Emprunt } from 'src/entity/emprunt';
import { EmpruntPost } from 'src/entity/empruntPost';
import { Transfert } from 'src/entity/transfert';
import { User } from 'src/entity/User';
import { AuthService } from 'src/services/auth.service';
import { EmpruntService } from 'src/services/emprunt.service';
import { TransfertService } from 'src/services/transfert.service';

@Component({
  selector: 'app-mes-emprunts',
  templateUrl: './mes-emprunts.page.html',
  styleUrls: ['./mes-emprunts.page.scss'],
})
export class MesEmpruntsPage implements OnInit {

  emprunts: Array<Emprunt> = new Array();
  transfert : Transfert= new Transfert();
  public user : User;
  empruntPost : EmpruntPost = new EmpruntPost();
  transEmett : Array<Transfert> = new Array();
  transRecep : Array<Transfert> = new Array();
  empruntsEmett : Array<Emprunt> = new Array();
  listeMatEmprunt : Array<Emprunt> = new Array();

  constructor(
    private empruntService: EmpruntService,
    private loadingCrtl: LoadingController,
    private authService: AuthService,
    private transfertService : TransfertService,
    private actionSheetCtrl : ActionSheetController
    ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.user = this.authService.getUserSession();
    this.empruntsEmett =[];
    this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl =>
      {
        loadingEl.present();
        this.empruntService.getEmpruntsByFilter('/api/users/'+((this.user.id).toString())).subscribe(response => {
          this.emprunts = response;
          this.transfertService.getTransfertsByEmetteur('/api/users/'+((this.user.id).toString())).subscribe(response => {
            this.transEmett =response;
            this.transEmett.forEach(element => {
              this.empruntsEmett = this.emprunts.filter((emprunt)=>emprunt.materiel?.id === element.materiel?.id);
               this.empruntsEmett.forEach(elmt =>{
                if (element.materiel?.id === elmt.materiel?.id) {
                  elmt.adhRecep= element.recepteur?.nom;
                  elmt.idTrans= element.id;
                }
              })
              this.emprunts = this.emprunts.filter((emprunt)=>emprunt.materiel?.id !== element.materiel?.id);
            })
            this.transfertService.getTransfertsByRecepteur('/api/users/'+((this.user.id).toString())).subscribe(response => {
              this.transRecep =response;
              loadingEl.dismiss();
            })
          })

        })

      }
    )
  }

  onCancel(id : number){
    this.actionSheetCtrl.create({
      header : 'ETES-VOUS SUR DE VOULOIR ANNULER ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl => {
              loadingEl.present();
              this.transfertService.deleteTransfertFromId(id).subscribe(() => {
                loadingEl.dismiss();
                this.ionViewWillEnter();
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


  onValider(id : number){
    this.actionSheetCtrl.create({
      header : 'ETES-VOUS SUR DE VOULOIR ACCEPTER ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCrtl.create({keyboardClose : true, message : 'Veuillez patienter...'}).then(loadingEl => {
              loadingEl.present();
              this.transfertService.getOneTransfert(id).subscribe(response => {
                this.transfert=response;

                this.empruntPost.motif='Transfert de materiel de '+this.transfert.emetteur?.nom+' à '+this.transfert.recepteur?.nom ;
                this.empruntPost.materiel='/api/materiels/'+(this.transfert.materiel.id).toString();
                this.empruntPost.adherent='/api/users/'+(this.transfert.recepteur?.id).toString();
                this.empruntPost.datedebut=new Date();
                this.empruntPost.datefin=this.empruntPost.datedebut;
                this.empruntService.getEmpruntsByMat('/api/materiels/'+(this.transfert.materiel.id).toString()).subscribe(response=>{
                  this.listeMatEmprunt= response;
                  this.listeMatEmprunt.forEach(elmt=>{
                    if (new Date(elmt.datedebut).toLocaleString() === new Date(elmt.datefin).toLocaleString()) {
                      this.empruntService.deleteEmpruntFromId(elmt.id).subscribe(()=>{
                         this.empruntService.createEmprunt(this.empruntPost).subscribe(()=>{
                    this.transfertService.deleteTransfertFromId(id).subscribe(()=>{
                      loadingEl.dismiss();
                    this.ionViewWillEnter();
                    })
                    })
                      })
                    }else if( new Date(elmt.datedebut)  <= new Date() && new Date(elmt.datefin)  >= new Date()) {
                      this.empruntService.deleteEmpruntFromId(elmt.id).subscribe(()=>{
                        this.empruntService.createEmprunt(this.empruntPost).subscribe(()=>{
                   this.transfertService.deleteTransfertFromId(id).subscribe(()=>{
                     loadingEl.dismiss();
                   this.ionViewWillEnter();
                   })
                   })
                     })
                    }
                  })
                })

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
