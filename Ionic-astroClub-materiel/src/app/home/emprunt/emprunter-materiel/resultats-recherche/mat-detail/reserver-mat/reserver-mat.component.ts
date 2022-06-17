import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { EmpruntPost } from 'src/entity/empruntPost';
import { User } from 'src/entity/User';
import { AuthService } from 'src/services/auth.service';
import { EmpruntService } from 'src/services/emprunt.service';

@Component({
  selector: 'app-reserver-mat',
  templateUrl: './reserver-mat.component.html',
  styleUrls: ['./reserver-mat.component.scss'],
})
export class ReserverMatComponent implements OnInit {

  @Input() selectedMat : number;
  empruntPost : EmpruntPost = new EmpruntPost;
  public user : User;
  form: FormGroup;
  today: Date = new Date();

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
    this.form = new FormGroup({
      dateDebut : new FormControl(new Date(), {
        updateOn : 'blur',
        validators : [Validators.required]
      }),
      dateFin: new FormControl(new Date(), {
        updateOn : 'blur',
        validators : [Validators.required]
      }),
      Motif : new FormControl(null , {
        updateOn : 'blur',
        validators : [Validators.required]
      })
    });
    this.user = this.authService.getUserSession();
  }

  onSubmitRep(){
    console.log(this.form)

    /* this.empruntPost.motif=form.value.motif;
    this.empruntPost.materiel='/api/materiels/'+(this.selectedMat).toString();
    this.empruntPost.adherent='/api/users/'+(this.user.id).toString();
    this.empruntPost.datedebut=form.value.dateDebut;
    this.empruntPost.datefin=form.value.dateFin;

    this.loadingCrtl.create({ keyboardClose: true, message: 'Veuillez patienter...' }).then(loadingEl => {
      loadingEl.present();
      this.empruntService.createEmprunt(this.empruntPost).subscribe(()=>{
        loadingEl.dismiss();
        this.modalCtrl.dismiss({message :'Materiel Réservé'}, 'confirm');
      })
      }) */
  }

}
