import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultatsRecherchePageRoutingModule } from './resultats-recherche-routing.module';

import { ResultatsRecherchePage } from './resultats-recherche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultatsRecherchePageRoutingModule
  ],
  declarations: [ResultatsRecherchePage]
})
export class ResultatsRecherchePageModule {}
