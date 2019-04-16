import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {AllRegionsComponent} from './all-regions/all-regions.component';
import {RegionDetailsComponent} from './region-details/region-details.component';
import {HomePageContentComponent} from './home-page-content/home-page-content.component';
import {ViewRegionOrdersComponent} from './view-region-orders/view-region-orders.component';
import {ViewOrderDetailsComponent} from './view-order-details/view-order-details.component';
import {ViewCustomersComponent} from './view-customers/view-customers.component';

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
},
{
  path: 'orders',
  component: ViewRegionOrdersComponent
},
{
  path: 'viewordersdetails/:id',
  component: ViewOrderDetailsComponent
},
{
  path: 'viewcustomers',
  component: ViewCustomersComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionRoutingModule { }
