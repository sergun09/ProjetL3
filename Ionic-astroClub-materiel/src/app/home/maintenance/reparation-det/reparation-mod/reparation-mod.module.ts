import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReparationModPageRoutingModule } from './reparation-mod-routing.module';

import { ReparationModPage } from './reparation-mod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReparationModPageRoutingModule
  ],
  declarations: [ReparationModPage]
})
export class ReparationModPageModule {}
