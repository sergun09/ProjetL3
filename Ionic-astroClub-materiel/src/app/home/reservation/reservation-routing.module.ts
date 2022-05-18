import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationPage } from './reservation.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationPage
  },
  {
    path: 'resultats-recherche',
    loadChildren: () => import('./resultats-recherche/resultats-recherche.module').then( m => m.ResultatsRecherchePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationPageRoutingModule {}
