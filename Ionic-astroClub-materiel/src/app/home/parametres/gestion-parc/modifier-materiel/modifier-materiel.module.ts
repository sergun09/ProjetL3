import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierMaterielPageRoutingModule } from './modifier-materiel-routing.module';

import { ModifierMaterielPage } from './modifier-materiel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierMaterielPageRoutingModule
  ],
  declarations: [ModifierMaterielPage]
})
export class ModifierMaterielPageModule {}
