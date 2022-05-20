import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMaterielPage } from './new-materiel.page';

const routes: Routes = [
  {
    path: '',
    component: NewMaterielPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMaterielPageRoutingModule {}
