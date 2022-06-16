import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { EmpruntPost } from 'src/entity/empruntPost';
import { User } from 'src/entity/User';
import { AuthService } from 'src/services/auth.service';
import { EmpruntService } from 'src/services/emprunt.service';

@Component({
  selector: 'app-emprunt-motif',
  templateUrl: './emprunt-motif.component.html',
  styleUrls: ['./emprunt-motif.component.scss'],
})
export class EmpruntMotifComponent implements OnInit {

  @Input() selectedMat : number;
  empruntPost : EmpruntPost = new EmpruntPost;
  public user : User;

  constructor(
    private loadingCrtl: LoadingController,
    private  modalCtrl: ModalController,
    private empruntService: EmpruntService,
    private authService :AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ionViewWillEnter(){
    this.user = this.authService.getUserSession();
  }

  onSubmitRep(form : NgForm){
    this.empruntPost.motif=form.value.motif;
    this.empruntPost.materiel='/api/materiels/'+(this.selectedMat).toString();
    this.empruntPost.adherent='/api/users/'+(this.user.id).toString();
    this.empruntPost.datedebut=new Date();
    this.empruntPost.datefin=new Date(2022,7,16);

    this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
      loadingEl.present();
      this.empruntService.createEmprunt(this.empruntPost).subscribe(()=>{
        loadingEl.dismiss();
        this.modalCtrl.dismiss({message :'Materiel Emprunter'}, 'confirm');
      })
      })
  }

}
