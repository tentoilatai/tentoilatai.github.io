import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'payment',
    loadComponent: () => import('./pages/payment/payment.component').then(m => m.PaymentComponent)
  },
  {
    path: 'cv',
    loadComponent: () => import('./pages/cv/cv.component').then(m => m.CvComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];