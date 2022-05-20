import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
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
  constructor(public adherentService: AdherentsService, private actionSheetCrtl: ActionSheetController) { this.ready = false; }

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

  deleteUser(idAdh: number) {
    this.actionSheetCrtl.create({
      header: 'ETES-VOUS SUR DE VOULOIR LE SUPPRIMER ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.adherentService.deleteUserFromId(idAdh).subscribe(() => {
              this.adherents = this.adherents.filter((adherent) => adherent.id !== idAdh);
            });
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
