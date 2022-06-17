import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { EmpruntPost } from 'src/entity/empruntPost';
import { User } from 'src/entity/User';
import { AdherentsService } from 'src/services/adherents.service';
import { AuthService } from 'src/services/auth.service';
import { EmpruntService } from 'src/services/emprunt.service';

@Component({
  selector: 'app-emprunt-gestionnaire',
  templateUrl: './emprunt-gestionnaire.component.html',
  styleUrls: ['./emprunt-gestionnaire.component.scss'],
})
export class EmpruntGestionnaireComponent implements OnInit {

  @Input() selectedMat : number;
  empruntPost : EmpruntPost = new EmpruntPost;
  public lstAdherents :Array<User> = new Array();
  public user : User;

  constructor(
    private loadingCrtl: LoadingController,
    private  modalCtrl: ModalController,
    private empruntService: EmpruntService,
    private authService :AuthService,
    private adherentService : AdherentsService
  ) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ionViewWillEnter(){
    this.user = this.authService.getUserSession();
    this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.adherentService.getAllUsers().subscribe(response => {
        this.lstAdherents = response;
        loadingEl.dismiss();
      })
      })
  }

  onSubmitRep(form : NgForm){
    this.empruntPost.motif=form.value.motif;
    this.empruntPost.materiel='/api/materiels/'+(this.selectedMat).toString();
    this.empruntPost.adherent='/api/users/'+(form.value.emprunt).toString();
    this.empruntPost.datedebut=new Date();
    this.empruntPost.datefin=this.empruntPost.datedebut;

    this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
      loadingEl.present();
      this.empruntService.createEmprunt(this.empruntPost).subscribe(()=>{
        loadingEl.dismiss();
        this.modalCtrl.dismiss({message :'Materiel Emprunter'}, 'confirm');
      })
      })
  }

}
