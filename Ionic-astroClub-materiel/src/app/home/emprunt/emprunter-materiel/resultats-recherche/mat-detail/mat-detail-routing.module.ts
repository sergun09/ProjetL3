import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatDetailPage } from './mat-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MatDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatDetailPageRoutingModule {}
