import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouvelAdherentPageRoutingModule } from './nouvel-adherent-routing.module';

import { NouvelAdherentPage } from './nouvel-adherent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouvelAdherentPageRoutingModule
  ],
  declarations: [NouvelAdherentPage]
})
export class NouvelAdherentPageModule {}
