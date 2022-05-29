import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReparationDetPageRoutingModule } from './reparation-det-routing.module';

import { ReparationDetPage } from './reparation-det.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReparationDetPageRoutingModule
  ],
  declarations: [ReparationDetPage]
})
export class ReparationDetPageModule {}
