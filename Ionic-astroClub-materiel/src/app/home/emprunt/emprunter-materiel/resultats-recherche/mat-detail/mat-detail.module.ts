import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatDetailPageRoutingModule } from './mat-detail-routing.module';

import { MatDetailPage } from './mat-detail.page';
import { EmpruntMotifComponent } from './emprunt-motif/emprunt-motif.component';
import { EmpruntGestionnaireComponent } from './emprunt-gestionnaire/emprunt-gestionnaire.component';
import { ReserverMatComponent } from './reserver-mat/reserver-mat.component';
import { ReserverGestionnaireComponent } from './reserver-gestionnaire/reserver-gestionnaire.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MatDetailPageRoutingModule
  ],
  declarations: [MatDetailPage, EmpruntMotifComponent, EmpruntGestionnaireComponent, ReserverMatComponent, ReserverGestionnaireComponent],
  entryComponents:[EmpruntMotifComponent, EmpruntGestionnaireComponent, ReserverMatComponent, ReserverGestionnaireComponent]
})
export class MatDetailPageModule {}
