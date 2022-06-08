import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesEmpruntsPage } from './mes-emprunts.page';

const routes: Routes = [
  {
    path: '',
    component: MesEmpruntsPage
  },
  {
    path: ':empruntId',
    loadChildren: () => import('./emprunt-det/emprunt-det.module').then( m => m.EmpruntDetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesEmpruntsPageRoutingModule {}
