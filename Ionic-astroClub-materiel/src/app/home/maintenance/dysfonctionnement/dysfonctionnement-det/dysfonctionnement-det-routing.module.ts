import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DysfonctionnementDetPage } from './dysfonctionnement-det.page';

const routes: Routes = [
  {
    path: '',
    component: DysfonctionnementDetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DysfonctionnementDetPageRoutingModule {}
