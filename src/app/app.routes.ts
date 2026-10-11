import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LegalNotice } from './pages/legal-notice/legal-notice';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
  },
  {
    path: 'legal-notice',
    component: LegalNotice,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
