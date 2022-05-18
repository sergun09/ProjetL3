import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationPage } from './resultats-recherche.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationPage
  },
 // {
    //path: ':materielId',
   // loadChildren: () => import('./mat-detail/mat-detail.module').then( m => m.MatDetailPageModule)
 // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultatsRecherchePageRoutingModule {}
