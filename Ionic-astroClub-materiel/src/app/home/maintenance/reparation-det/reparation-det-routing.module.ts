import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReparationDetPage } from './reparation-det.page';

const routes: Routes = [
  {
    path: '',
    component: ReparationDetPage
  },
  {
    path: ':reparationId',
    loadChildren: () => import('./reparation-mod/reparation-mod.module').then( m => m.ReparationModPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReparationDetPageRoutingModule {}
