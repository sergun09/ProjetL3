import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouvelleReparationPage } from './nouvelle-reparation.page';

const routes: Routes = [
  {
    path: '',
    component: NouvelleReparationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouvelleReparationPageRoutingModule {}
