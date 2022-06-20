import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-disfonctionnement',
  templateUrl: './disfonctionnement.component.html',
  styleUrls: ['./disfonctionnement.component.scss'],
})
export class DisfonctionnementComponent implements OnInit {

  constructor(
    private loadingCrtl: LoadingController,
    private  modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmitRep(form : NgForm){
    console.log(form.value.description);
    this.modalCtrl.dismiss({message : 'Disfonctionnement Ajouté '}, 'confirmer');
  }

}
