import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdherentsPageRoutingModule } from './adherents-routing.module';

import { AdherentsPage } from './adherents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdherentsPageRoutingModule
  ],
  declarations: [AdherentsPage]
})
export class AdherentsPageModule {}
