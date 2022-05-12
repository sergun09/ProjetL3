import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametresPage } from './parametres.page';

const routes: Routes = [
  {
    path: '',
    component: ParametresPage
  },
  {
    path: 'identite',
    loadChildren: () => import('./identite/identite.module').then(m => m.IdentitePageModule)
  },
  {
    path: 'adherents',
    loadChildren: () => import('./adherents/adherents.module').then(m => m.AdherentsPageModule)
  },
  {
    path: 'gestion-parc',
    loadChildren: () => import('./gestion-parc/gestion-parc.module').then(m => m.GestionParcPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametresPageRoutingModule { }
