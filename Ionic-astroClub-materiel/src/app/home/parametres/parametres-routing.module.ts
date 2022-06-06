import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasRoleGuard } from 'src/app/has-role.guard';

import { ParametresPage } from './parametres.page';

const routes: Routes = [
  {
    path: '',
    component: ParametresPage
  },
  {
    path: 'identite',
    loadChildren: () => import('./identite/identite.module').then(m => m.IdentitePageModule)
  },
  {
    path: 'adherents',
    loadChildren: () => import('./adherents/adherents.module').then(m => m.AdherentsPageModule),
    canActivate: [HasRoleGuard],
    data:
    {
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: 'gestion-parc',
    loadChildren: () => import('./gestion-parc/gestion-parc.module').then(m => m.GestionParcPageModule),
    canActivate: [HasRoleGuard],
    data:
    {
      role: 'ROLE_ADMIN'
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametresPageRoutingModule { }
