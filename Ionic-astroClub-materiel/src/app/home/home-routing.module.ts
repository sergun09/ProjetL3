import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasRoleGuard } from '../has-role.guard';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'inventaire',
    loadChildren: () => import('./inventaire/inventaire.module').then( m => m.InventairePageModule)
  },
  {
    path: 'emprunt',
    loadChildren: () => import('./emprunt/emprunt.module').then( m => m.EmpruntPageModule),
    canActivate: [HasRoleGuard],
    data:
    {
      role: 'ROLE_USER'
    }
  },
  {
    path: 'reservation',
    loadChildren: () => import('./reservation/reservation.module').then( m => m.ReservationPageModule),
    canActivate: [HasRoleGuard],
    data:
    {
      role: 'ROLE_USER'
    }
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then( m => m.MaintenancePageModule),
    canActivate: [HasRoleGuard],
    data:
    {
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: 'parametres',
    loadChildren: () => import('./parametres/parametres.module').then( m => m.ParametresPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
