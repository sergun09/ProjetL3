import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesEmpruntsPage } from './mes-emprunts.page';

const routes: Routes = [
  {
    path: '',
    component: MesEmpruntsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesEmpruntsPageRoutingModule {}
