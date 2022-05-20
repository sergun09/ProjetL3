import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMaterielPageRoutingModule } from './new-materiel-routing.module';

import { NewMaterielPage } from './new-materiel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewMaterielPageRoutingModule
  ],
  declarations: [NewMaterielPage]
})
export class NewMaterielPageModule {}
