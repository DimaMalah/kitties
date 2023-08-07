import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    loadChildren: () =>
      import('./shared/components/home/home.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
