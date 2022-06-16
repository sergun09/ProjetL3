import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatDetailPageRoutingModule } from './mat-detail-routing.module';

import { MatDetailPage } from './mat-detail.page';
import { EmpruntMotifComponent } from './emprunt-motif/emprunt-motif.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDetailPageRoutingModule
  ],
  declarations: [MatDetailPage, EmpruntMotifComponent],
  entryComponents:[EmpruntMotifComponent]
})
export class MatDetailPageModule {}
