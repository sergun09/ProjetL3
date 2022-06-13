import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpruntDetPage } from './emprunt-det.page';

const routes: Routes = [
  {
    path: '',
    component: EmpruntDetPage
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpruntDetPageRoutingModule {}
