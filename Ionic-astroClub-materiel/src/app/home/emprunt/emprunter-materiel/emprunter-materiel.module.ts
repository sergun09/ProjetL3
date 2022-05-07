import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmprunterMaterielPageRoutingModule } from './emprunter-materiel-routing.module';

import { EmprunterMaterielPage } from './emprunter-materiel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmprunterMaterielPageRoutingModule
  ],
  declarations: [EmprunterMaterielPage]
})
export class EmprunterMaterielPageModule {}
