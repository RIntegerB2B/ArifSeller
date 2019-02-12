import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {InventoryHealthComponent} from './inventory-health/inventory-health.component';
import {SingleProductComponent} from './single-product/single-product.component';

const routes: Routes = [{
  path: 'inventoryhealth',
  component: InventoryHealthComponent
},
{
  path: 'singleinventory/:id',
  component: SingleProductComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
