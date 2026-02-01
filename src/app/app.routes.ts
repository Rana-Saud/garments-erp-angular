import { Routes } from '@angular/router';
import { Login } from './modules/auth/login/login';
import { Layout } from './layout/layout';
import { AuthGuard } from './core/guards/auth-guard';
// CPO and Process moved to canonical list/form subfolders (lazy-loaded below)
import { BarcodeGenerator } from './shared/components/barcode-generator/barcode-generator';
import { BarcodeScanner } from './shared/components/barcode-scanner/barcode-scanner';

export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      { path: 'cpo', loadComponent: () => import('./modules/cpo/list/cpo-list').then(m => m.CpoList) },
      { path: 'cpo/add', loadComponent: () => import('./modules/cpo/form/cpo-form').then(m => m.CpoForm) },
      { path: 'cpo/edit/:id', loadComponent: () => import('./modules/cpo/form/cpo-form').then(m => m.CpoForm) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'process', loadComponent: () => import('./modules/process/list/process-list').then(m => m.ProcessList) },
      { path: 'process/add', loadComponent: () => import('./modules/process/form/process-form').then(m => m.ProcessForm) },
      { path: 'process/edit/:id', loadComponent: () => import('./modules/process/form/process-form').then(m => m.ProcessForm) },


      // Dashboard
      { path: 'dashboard', loadComponent: () => import('./modules/dashboard/dashboard').then(m => m.Dashboard) },

      // CPO & Work Flow (sequential for garments)
      { path: 'workorders', loadComponent: () => import('./modules/work-order/list/work-order-list').then(m => m.WorkOrderList) },
      { path: 'workorders/add', loadComponent: () => import('./modules/work-order/form/work-order-form').then(m => m.WorkOrderForm) },
      { path: 'workorder/:id', loadComponent: () => import('./modules/work-order/detail/work-order-detail').then(m => m.WorkOrderDetail) },

      // Inventory (receipts -> stock)
      { path: 'inventory', loadComponent: () => import('./modules/inventory/list/inventory-list').then(m => m.InventoryList) },
      { path: 'inventory/add', loadComponent: () => import('./modules/inventory/form/inventory-form').then(m => m.InventoryForm) },
      { path: 'inventory/edit/:id', loadComponent: () => import('./modules/inventory/form/inventory-form').then(m => m.InventoryForm) },

      // QC
      { path: 'qc', loadComponent: () => import('./modules/qc/list/qc-list').then(m => m.QcList) },
      { path: 'qc/add', loadComponent: () => import('./modules/qc/form/qc-form').then(m => m.QcForm) },

      // Packing / Dispatch
      { path: 'packing', loadComponent: () => import('./modules/packing/list/packing-list').then(m => m.PackingList) },
      { path: 'packing/add', loadComponent: () => import('./modules/packing/form/packing-form').then(m => m.PackingForm) },

      // Users & Admin
      { path: 'users', loadComponent: () => import('./modules/users/list/user-list').then(m => m.UserList) },
      { path: 'users/add', loadComponent: () => import('./modules/users/form/user-form').then(m => m.UserForm) },
      { path: 'users/edit/:id', loadComponent: () => import('./modules/users/form/user-form').then(m => m.UserForm) },

      // Barcode pages
      { path: 'barcode/generate', component: BarcodeGenerator },
      { path: 'barcode/scan', component: BarcodeScanner }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
