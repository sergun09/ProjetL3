import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DysfonctionnementDetPageRoutingModule } from './dysfonctionnement-det-routing.module';

import { DysfonctionnementDetPage } from './dysfonctionnement-det.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DysfonctionnementDetPageRoutingModule
  ],
  declarations: [DysfonctionnementDetPage]
})
export class DysfonctionnementDetPageModule {}
