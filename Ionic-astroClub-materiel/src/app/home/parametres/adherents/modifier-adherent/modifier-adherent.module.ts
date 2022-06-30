import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierAdherentPageRoutingModule } from './modifier-adherent-routing.module';

import { ModifierAdherentPage } from './modifier-adherent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierAdherentPageRoutingModule
  ],
  declarations: [ModifierAdherentPage]
})
export class ModifierAdherentPageModule {}
