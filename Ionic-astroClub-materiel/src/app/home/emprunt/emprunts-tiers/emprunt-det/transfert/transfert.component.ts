import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { TransfertPost } from 'src/entity/transfertPost';
import { User } from 'src/entity/User';
import { AdherentsService } from 'src/services/adherents.service';
import { AuthService } from 'src/services/auth.service';
import { TransfertService } from 'src/services/transfert.service';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.scss'],
})
export class TransfertComponent implements OnInit {

  @Input() selectedMat : number;
  public lstAdherents :Array<User> = new Array();
  public user : User;
  public newTransf : TransfertPost = {
    emetteur: '',
    recepteur: '',
    etat: false,
    materiel : ''
  }

  constructor(
    private loadingCrtl: LoadingController,
    private  modalCtrl: ModalController,
    private authService :AuthService,
    private adherentService : AdherentsService,
    private transfertService : TransfertService
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
        this.lstAdherents= this.lstAdherents.filter((adherent) => adherent.id !== this.user.id)
        loadingEl.dismiss();
      })
      })
  }

  onSubmitRep(form : NgForm){
    this.newTransf.emetteur= '/api/users/'+(this.user.id).toString();
    this.newTransf.recepteur= '/api/users/'+(form.value.emprunt).toString();
    this.newTransf.etat= true;
    this.newTransf.materiel= '/api/materiels/'+(this.selectedMat).toString();

    this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
      loadingEl.present();
      this.transfertService.createTransfert(this.newTransf).subscribe(()=>{
        loadingEl.dismiss();
        this.modalCtrl.dismiss({message :'Materiel transférer'}, 'confirm');
      })
      })
  }

}
