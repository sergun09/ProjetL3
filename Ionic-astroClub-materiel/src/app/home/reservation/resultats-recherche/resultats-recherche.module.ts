import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ResultatsRecherchePageRoutingModule} from "./resultats-recherche-routing.module";
import {ReservationPage} from  "./resultats-recherche.page"


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultatsRecherchePageRoutingModule
  ],
  declarations: [ReservationPage]
})
export class ResultatsRecherchePageModule {}
