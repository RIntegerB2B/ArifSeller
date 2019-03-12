import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {RegionComponent} from './region/region.component';
import {ProductSettingsComponent} from './product-settings/product-settings.component';

const routes: Routes = [{
  path: 'regions',
  component: RegionComponent
},
{
  path: 'products',
  component: ProductSettingsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
