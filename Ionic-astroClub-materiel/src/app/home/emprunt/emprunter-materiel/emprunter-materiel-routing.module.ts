import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmprunterMaterielPage } from './emprunter-materiel.page';

const routes: Routes = [
  {
    path: '',
    component: EmprunterMaterielPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmprunterMaterielPageRoutingModule {}
