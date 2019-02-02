import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { Region } from './region.model';
import { SettingsService } from '../settings.service';




export interface PeriodicElement {
  regionName: string;
  currency: string;
}


@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  regionModel: Region;
  regionDetail: Region[];
  addRegionForm: FormGroup;
  message;
  action;
  regionData;
  regionNameFilter;
  showRegionName: boolean;
  currencyValue;
  selectedCurrency;
  displayedColumns: string[] = ['regionName', 'currency', 'edit', 'delete'];
selectedRegion;
   region;
  constructor(private fb: FormBuilder, private router: Router, private settingsService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getRegions();
    this.getJSONRegion();
  }
  createForm() {
    this.addRegionForm = this.fb.group({
      regionName: [''],
      currency: ['']
    });
  }
  getJSONRegion() {
  this.settingsService.getCurrency().subscribe(data => {
    this.region = data;
     console.log(data);
   });
  }
  getRegions() {
    this.settingsService.getAllRegions().subscribe(data => {
      this.regionDetail = data;
      this.regionData = new MatTableDataSource<PeriodicElement>(data);
    }, err => {
      console.log(err);
    });
  }
  showCurrency(val) {
    this.currencyValue = val.currency;
    this.selectedRegion = val.country;
/* this.currencyValue = this.selectedCurrency[0].currency;
if (elem === '') {
  this.showRegionName = false;
} else {
  this.regionNameFilter = this.regionDetail.filter(data => data.regionName.indexOf(elem) !== -1);
  if (this.regionNameFilter.length !== 0) {
this.showRegionName = true;
  } else if (this.regionNameFilter.length === 0 ) {
    this.showRegionName = false;
  }
} */
  }
  addRegion() {
    this.message = 'New Region created';
    this.regionModel = new Region();
    this.regionModel.regionName = this.selectedRegion;
    this.regionModel.currency = this.addRegionForm.controls.currency.value;
    this.settingsService.addRegion(this.regionModel).subscribe(data => {
      this.regionDetail = data;
      this.regionData = new MatTableDataSource<PeriodicElement>(data);
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.addRegionForm.reset();
    }, err => {
      console.log(err);
    });
  }
  deleteRegion(element) {
    this.settingsService.deleteRegion(element).subscribe(data => {
      this.regionDetail = data;
      this.regionData = new MatTableDataSource<PeriodicElement>(data);
    }, err => {
      console.log(err);
    });
  }
}
