import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdherentsPageRoutingModule } from './adherents-routing.module';

import { AdherentsPage } from './adherents.page';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdherentsPageRoutingModule,
    TranslateModule
  ],
  declarations: [AdherentsPage]
})
export class AdherentsPageModule {}
