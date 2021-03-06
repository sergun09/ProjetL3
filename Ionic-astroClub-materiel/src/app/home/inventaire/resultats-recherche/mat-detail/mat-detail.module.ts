import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatDetailPageRoutingModule } from './mat-detail-routing.module';

import { MatDetailPage } from './mat-detail.page';
import { DisfonctionnementComponent } from './disfonctionnement/disfonctionnement.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDetailPageRoutingModule,
    TranslateModule
  ],
  declarations: [MatDetailPage, DisfonctionnementComponent],
  entryComponents:[  DisfonctionnementComponent]
})
export class MatDetailPageModule {}
