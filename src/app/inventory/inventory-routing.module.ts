import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {InventoryHealthComponent} from './inventory-health/inventory-health.component';

const routes: Routes = [{
  path: 'inventoryhealth',
  component: InventoryHealthComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
