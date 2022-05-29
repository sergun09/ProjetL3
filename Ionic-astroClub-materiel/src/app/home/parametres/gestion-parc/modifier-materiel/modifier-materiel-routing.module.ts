import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifierMaterielPage } from './modifier-materiel.page';

const routes: Routes = [
  {
    path: '',
    component: ModifierMaterielPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifierMaterielPageRoutingModule {}
