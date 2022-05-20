import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionParcPage } from './gestion-parc.page';

const routes: Routes = [
  {
    path: '',
    component: GestionParcPage
  },
  {
    path: 'new-materiel',
    loadChildren: () => import('./new-materiel/new-materiel.module').then( m => m.NewMaterielPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionParcPageRoutingModule {}
