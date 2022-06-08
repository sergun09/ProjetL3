import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpruntDetPageRoutingModule } from './emprunt-det-routing.module';

import { EmpruntDetPage } from './emprunt-det.page';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpruntDetPageRoutingModule
  ],
  declarations: [EmpruntDetPage, DescriptionComponent],
  entryComponents:[DescriptionComponent]
})
export class EmpruntDetPageModule {}
