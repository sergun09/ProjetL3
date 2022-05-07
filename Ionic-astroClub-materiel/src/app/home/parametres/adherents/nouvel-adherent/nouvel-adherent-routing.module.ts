import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouvelAdherentPage } from './nouvel-adherent.page';

const routes: Routes = [
  {
    path: '',
    component: NouvelAdherentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouvelAdherentPageRoutingModule {}
