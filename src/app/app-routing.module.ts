import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
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
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
