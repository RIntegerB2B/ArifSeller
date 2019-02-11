import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavSidebarComponent } from './shared/nav-sidebar/nav-sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: NavSidebarComponent,
    children: [{
      path: 'account',
      loadChildren: './account/account.module#AccountModule'
    },
    {
      path: 'category',
      loadChildren: './category/category.module#CategoryModule'
    },
    {
      path: 'product',
      loadChildren: './product/product.module#ProductModule'
    },
    {
      path: 'moq',
      loadChildren: './moq/moq.module#MoqModule'
    },
    {
      path: 'settings',
      loadChildren: './settings/settings.module#SettingsModule'
    },
    {
      path: 'inventory',
      loadChildren: './inventory/inventory.module#InventoryModule'
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

