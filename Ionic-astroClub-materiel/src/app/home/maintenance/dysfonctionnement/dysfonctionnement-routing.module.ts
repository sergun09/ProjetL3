import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DysfonctionnementPage } from './dysfonctionnement.page';

const routes: Routes = [
  {
    path: '',
    component: DysfonctionnementPage
  },
  {
    path: ':dysfonctionnementId',
    loadChildren: () => import('./dysfonctionnement-det/dysfonctionnement-det.module').then( m => m.DysfonctionnementDetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DysfonctionnementPageRoutingModule {}
