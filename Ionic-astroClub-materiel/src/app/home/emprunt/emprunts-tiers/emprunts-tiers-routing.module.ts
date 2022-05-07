import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpruntsTiersPage } from './emprunts-tiers.page';

const routes: Routes = [
  {
    path: '',
    component: EmpruntsTiersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpruntsTiersPageRoutingModule {}
