import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpruntPage } from './emprunt.page';

const routes: Routes = [
  {
    path: '',
    component: EmpruntPage
  },
  {
    path: 'emprunter-materiel',
    loadChildren: () => import('./emprunter-materiel/emprunter-materiel.module').then( m => m.EmprunterMaterielPageModule)
  },
  {
    path: 'mes-emprunts',
    loadChildren: () => import('./mes-emprunts/mes-emprunts.module').then( m => m.MesEmpruntsPageModule)
  },
  {
    path: 'emprunts-tiers',
    loadChildren: () => import('./emprunts-tiers/emprunts-tiers.module').then( m => m.EmpruntsTiersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpruntPageRoutingModule {}
