import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdherentsPage } from './adherents.page';

const routes: Routes = [
  {
    path: '',
    component: AdherentsPage
  },
  {
    path: 'nouvel-adherent',
    loadChildren: () => import('./nouvel-adherent/nouvel-adherent.module').then( m => m.NouvelAdherentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdherentsPageRoutingModule {}
