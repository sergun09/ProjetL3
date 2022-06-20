import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DysfonctionnementPageRoutingModule } from './dysfonctionnement-routing.module';

import { DysfonctionnementPage } from './dysfonctionnement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DysfonctionnementPageRoutingModule
  ],
  declarations: [DysfonctionnementPage]
})
export class DysfonctionnementPageModule {}
