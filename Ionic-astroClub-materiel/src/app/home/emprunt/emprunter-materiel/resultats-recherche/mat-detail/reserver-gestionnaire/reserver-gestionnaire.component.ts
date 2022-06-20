import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Emprunt } from 'src/entity/emprunt';
import { EmpruntPost } from 'src/entity/empruntPost';
import { Inventaire } from 'src/entity/Inventaire';
import { User } from 'src/entity/User';
import { AdherentsService } from 'src/services/adherents.service';
import { AuthService } from 'src/services/auth.service';
import { EmpruntService } from 'src/services/emprunt.service';
import { InventairesService } from 'src/services/inventaires.service';

@Component({
  selector: 'app-reserver-gestionnaire',
  templateUrl: './reserver-gestionnaire.component.html',
  styleUrls: ['./reserver-gestionnaire.component.scss'],
})
export class ReserverGestionnaireComponent implements OnInit {

  @Input() selectedMat : number;
  empruntPost : EmpruntPost = new EmpruntPost;
  public user : User;
  public emprunts : Array<Emprunt> = new Array();
  form: FormGroup;
  inventaire : Inventaire;
  today : Date = new Date();
  todayToFormat: string ;
  dateTo : Date = new Date();
  dateToFormat: string;
  public lstAdherents :Array<User> = new Array();

  constructor(
    private loadingCrtl: LoadingController,
    private  modalCtrl: ModalController,
    private empruntService: EmpruntService,
    private authService :AuthService,
    private alertCtrl : AlertController,
    private inventaireService: InventairesService,
    private navCtrl: NavController,
    private adherentService : AdherentsService
  ) { }

  formatDate(date : Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

  ngOnInit() {
    this.dateTo.setDate(this.dateTo.getFullYear() + 5);
    this.todayToFormat=this.formatDate(new Date());
    this.dateToFormat=this.formatDate(this.dateTo);

        this.form = new FormGroup({
      dateDebut : new FormControl(null, {
        updateOn : 'blur',
        validators : [Validators.required]
      }),
      dateFin: new FormControl(null, {
        updateOn : 'blur',
        validators : [Validators.required]
      }),
      motif : new FormControl(null , {
        updateOn : 'blur',
        validators : [Validators.required]
      }),
      emprunt: new FormControl(null, {
        updateOn : 'blur',
        validators : [Validators.required]
      })
    });
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ionViewWillEnter(){
    this.user = this.authService.getUserSession();
    this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.inventaireService.getOneInventaire(this.selectedMat).subscribe(response => {
        this.inventaire = response;
      })
      this.adherentService.getAllUsers().subscribe(response => {
        this.lstAdherents = response;
        loadingEl.dismiss();
      })
      })
  }

  onSubmitRep(){
    this.empruntPost.motif=this.form.value.motif;
    this.empruntPost.materiel='/api/materiels/'+(this.selectedMat).toString();
    if (this.form.value.emprunt === null) {
      this.empruntPost.adherent='/api/users/'+(this.user.id).toString();
    }else{
      this.empruntPost.adherent='/api/users/'+(this.form.value.emprunt).toString();
    }

    if (this.form.value.dateDebut=== null) {
      this.empruntPost.datedebut= this.today;
    }else{
      this.empruntPost.datedebut=this.form.value.dateDebut;
    }
    this.empruntPost.datefin=this.form.value.dateFin;

    this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
      loadingEl.present();
      this.empruntService.getEmpruntsByMat('/api/materiels/'+((this.selectedMat).toString())).subscribe(response => {
        this.emprunts = response;

        if (this.emprunts.length === 0) {
            this.empruntService.createEmprunt(this.empruntPost).subscribe(()=>{
              loadingEl.dismiss();
              this.modalCtrl.dismiss({message :'Materiel Réservé'}, 'confirm');
            })
        }else if (new Date(this.emprunts[0].datedebut).toLocaleString() === new Date(this.emprunts[0].datefin).toLocaleString()) {

            this.empruntService.createEmprunt(this.empruntPost).subscribe(()=>{
              loadingEl.dismiss();
              this.modalCtrl.dismiss({message :'Materiel Réservé'}, 'confirm');
            })
        }else if( new Date(this.empruntPost.datedebut)  >= new Date(this.emprunts[0].datedebut) && new Date(this.empruntPost.datefin)  <= new Date(this.emprunts[0].datefin)) {
            loadingEl.dismiss();
            this.alertCtrl.create({
            header: 'Attention !!!',
            message: this.inventaire.intitule+' est réservé par '+this.emprunts[0].adherent?.nom+', du '+new Date(this.emprunts[0].datedebut).toLocaleString()+' à '+new Date(this.emprunts[0].datefin).toLocaleString()+', pour '+this.emprunts[0].motif,
            buttons: ['OK']
          }).then(alertEl => {
              alertEl.present();
            })
          }else if (new Date(this.empruntPost.datedebut)  <= new Date(this.emprunts[0].datefin)) {
            loadingEl.dismiss();
            this.alertCtrl.create({
            header: 'Attention !!!',
            message: this.inventaire.intitule+' est réservé par '+this.emprunts[0].adherent?.nom+', du '+new Date(this.emprunts[0].datedebut).toLocaleString()+' à '+new Date(this.emprunts[0].datefin).toLocaleString()+', pour '+this.emprunts[0].motif,
            buttons: ['OK']
          }).then(alertEl => {
              alertEl.present();
            })
          }else{
                this.empruntService.createEmprunt(this.empruntPost).subscribe(()=>{
                  loadingEl.dismiss();
                  this.modalCtrl.dismiss({message :'Materiel Réservé'}, 'confirm');
                })
          }
      })
    })



  }

}
