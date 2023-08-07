import { Routes } from '@angular/router';
import { WelcomeComponent } from '@src/src/app/features/welcome/welcome.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'cats',
    loadComponent: () =>
      import('../../../features/cats/cats.component').then(
        (m) => m.CatsComponent
      ),
  },
  {
    path: 'dogs',
    loadComponent: () =>
      import('../../../features/dogs/dogs.component').then(
        (m) => m.DogsComponent
      ),
  },
  {
    path: 'turtles',
    loadComponent: () =>
      import('../../../features/turtles/turtles.component').then(
        (m) => m.TurtlesComponent
      ),
  },
  {
    path: 'sharks',
    loadComponent: () =>
      import('../../../features/sharks/sharks.component').then(
        (m) => m.SharksComponent
      ),
  },
];
