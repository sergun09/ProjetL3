import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { DysfonctionnementPost } from 'src/entity/dysfonctionnementPost';
import { User } from 'src/entity/User';
import { AuthService } from 'src/services/auth.service';
import { DysfonctionnementService } from 'src/services/dysfonctionnement.service';

@Component({
  selector: 'app-disfonctionnement',
  templateUrl: './disfonctionnement.component.html',
  styleUrls: ['./disfonctionnement.component.scss'],
})
export class DisfonctionnementComponent implements OnInit {

  @Input() selectedMat: number;
  public user: User=new User();
  public newDysfct : DysfonctionnementPost = {
    adherent : '',
    materiel : '',
    description : '',
    date : new Date()
  };

  constructor(
    private loadingCrtl: LoadingController,
    private  modalCtrl: ModalController,
    private authService : AuthService,
    private dysfonctionnementService: DysfonctionnementService
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.user= this.authService.getUserSession();
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmitRep(form : NgForm){
    this.newDysfct.adherent = '/api/users/'+(this.user.id).toString();
    this.newDysfct.date= new Date();
    this.newDysfct.description= form.value.description;
    this.newDysfct.materiel= '/api/materiels/'+(this.selectedMat).toString();

    this.loadingCrtl.create({keyboardClose : true , message : 'Veuillez patienter...'}).then(loadingEl => {
      loadingEl.present();
      this.dysfonctionnementService.createDysfonctionnement(this.newDysfct).subscribe(()=>{
        loadingEl.dismiss();
        this.modalCtrl.dismiss({message : 'Disfonctionnement Ajouté '}, 'confirmer');
      });
    });
  }

}
