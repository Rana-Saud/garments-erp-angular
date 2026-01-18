import { Routes } from '@angular/router';
import { Login } from './modules/auth/login/login';
import { Layout } from './layout/layout';
import { AuthGuard } from './core/guards/auth-guard';
import { CpoList } from './modules/cpo-list/cpo-list';
import { CpoForm } from './modules/cpo-form/cpo-form';
import { ProcessList } from './modules/process-list/process-list';
import { ProcessForm } from './modules/process-form/process-form';

export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: CpoList },
      { path: 'cpo', component: CpoList },
      { path: 'cpo-add', component: CpoForm },
      { path: 'cpo-edit/:id', component: CpoForm },
      { path: 'process', component: ProcessList },
      { path: 'process-add', component: ProcessForm },
      { path: 'process-edit/:id', component: ProcessForm }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
