import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePage } from './maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenancePage
  },
  {
    path: 'nouvelle-reparation',
    loadChildren: () => import('./nouvelle-reparation/nouvelle-reparation.module').then( m => m.NouvelleReparationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancePageRoutingModule {}
