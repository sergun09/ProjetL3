import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReparationModPage } from './reparation-mod.page';

const routes: Routes = [
  {
    path: '',
    component: ReparationModPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReparationModPageRoutingModule {}
