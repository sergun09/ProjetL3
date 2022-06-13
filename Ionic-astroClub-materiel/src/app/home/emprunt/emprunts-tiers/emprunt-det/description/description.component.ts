import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Inventaire } from 'src/entity/Inventaire';
import { InventairesService } from 'src/services/inventaires.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {

  @Input() selectedMat : number;
  public inventaire: Inventaire = new Inventaire();

  constructor(
    private inventaireService:InventairesService,
    private loadingCrtl: LoadingController,
    private  modalCtrl: ModalController
    ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.loadingCrtl.create({keyboardClose: true, message : 'Veuillez patienter...'}).then(loadingEl =>{
      loadingEl.present();
      this.inventaireService.getOneInventaire(this.selectedMat).subscribe(response => {
        this.inventaire = response;
        loadingEl.dismiss();
      })
    })
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
