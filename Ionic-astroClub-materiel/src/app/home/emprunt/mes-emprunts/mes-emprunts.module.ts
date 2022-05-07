import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesEmpruntsPageRoutingModule } from './mes-emprunts-routing.module';

import { MesEmpruntsPage } from './mes-emprunts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesEmpruntsPageRoutingModule
  ],
  declarations: [MesEmpruntsPage]
})
export class MesEmpruntsPageModule {}
