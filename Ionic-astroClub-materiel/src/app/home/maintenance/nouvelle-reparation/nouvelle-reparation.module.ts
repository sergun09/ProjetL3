import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouvelleReparationPageRoutingModule } from './nouvelle-reparation-routing.module';

import { NouvelleReparationPage } from './nouvelle-reparation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouvelleReparationPageRoutingModule
  ],
  declarations: [NouvelleReparationPage]
})
export class NouvelleReparationPageModule {}
