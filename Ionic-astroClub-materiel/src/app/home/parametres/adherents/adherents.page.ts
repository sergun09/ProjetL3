import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonItemSliding, LoadingController } from '@ionic/angular';
import { User } from 'src/entity/User';
import { AdherentsService } from 'src/services/adherents.service';

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
    private loadingCrtl: LoadingController) {
    this.ready = false;
  }

  ngOnInit() {
    // this.adherentService.getAllUsers().subscribe((response) =>
    // {
    //   this.adherents = response;
    //   this.ready = true;
    // });

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
