import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule} from '@angular/forms';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule,
  MatFormFieldModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatAutocompleteModule
} from '@angular/material';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AllRegionsComponent } from './all-regions/all-regions.component';
import {RegionRoutingModule} from './region-routing.module';
import { RegionDetailsComponent } from './region-details/region-details.component';
import { HomePageContentComponent } from './home-page-content/home-page-content.component';
import { ViewRegionOrdersComponent } from './view-region-orders/view-region-orders.component';
import { ViewOrderDetailsComponent } from './view-order-details/view-order-details.component';
import {ViewCustomersComponent} from './view-customers/view-customers.component';

@NgModule({
  declarations: [AllRegionsComponent, RegionDetailsComponent, HomePageContentComponent, ViewRegionOrdersComponent,
     ViewOrderDetailsComponent, ViewCustomersComponent],
  imports: [
    HttpClientModule,
    RegionRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatStepperModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatAutocompleteModule
  ],
  providers:
   [
   ]
})
export class RegionModule { }
