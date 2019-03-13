import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {AllRegionsComponent} from './all-regions/all-regions.component';
import {RegionDetailsComponent} from './region-details/region-details.component';
import {HomePageContentComponent} from './home-page-content/home-page-content.component';

const routes: Routes = [{
  path: 'allregions',
  component: AllRegionsComponent
},
{
  path: 'region/:id',
  component: RegionDetailsComponent
},
{
  path: 'homepage/:id',
  component: HomePageContentComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionRoutingModule { }
