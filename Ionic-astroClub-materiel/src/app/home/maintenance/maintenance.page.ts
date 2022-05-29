import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonItemSliding, LoadingController } from '@ionic/angular';
import { Reparation } from 'src/entity/reparation';
import { ReparationService } from 'src/services/reparation.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

  reparations: Array<Reparation> = new Array()
  ready : boolean;

  constructor(private reparationService: ReparationService
    ) {
    this.ready= false;
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.reparationService.getAllReparations().subscribe(response => {
      this.reparations = response;
      this.ready= true;
    })
  }
}
