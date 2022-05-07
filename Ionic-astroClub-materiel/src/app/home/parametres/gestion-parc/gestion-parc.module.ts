import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionParcPageRoutingModule } from './gestion-parc-routing.module';

import { GestionParcPage } from './gestion-parc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionParcPageRoutingModule
  ],
  declarations: [GestionParcPage]
})
export class GestionParcPageModule {}
