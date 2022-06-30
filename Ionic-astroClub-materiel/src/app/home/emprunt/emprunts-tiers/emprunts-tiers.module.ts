import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpruntsTiersPageRoutingModule } from './emprunts-tiers-routing.module';

import { EmpruntsTiersPage } from './emprunts-tiers.page';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpruntsTiersPageRoutingModule,
    TranslateModule
  ],
  declarations: [EmpruntsTiersPage]
})
export class EmpruntsTiersPageModule {}
