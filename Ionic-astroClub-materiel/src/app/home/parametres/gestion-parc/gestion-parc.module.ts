import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionParcPageRoutingModule } from './gestion-parc-routing.module';

import { GestionParcPage } from './gestion-parc.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionParcPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [GestionParcPage]
})
export class GestionParcPageModule {}
