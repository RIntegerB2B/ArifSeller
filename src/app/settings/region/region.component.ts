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
  regions = [ { 'regionName': 'India', 'currency': '₹'},
  { 'regionName': 'UAE', 'currency': 'د.إ'},
  { 'regionName': 'Singapore', 'currency': '$'},
  { 'regionName': 'Malaysia', 'currency': 'RM'}];
  constructor(private fb: FormBuilder, private router: Router, private settingsService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getRegions();
  }
  createForm() {
    this.addRegionForm = this.fb.group({
      regionName: [''],
      currency: ['']
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
  addRegion() {
    this.message = 'New Region created';
    this.regionModel = new Region();
    this.regionModel.regionName = this.addRegionForm.controls.regionName.value;
    this.regionModel.currency = this.addRegionForm.controls.currency.value;
    this.settingsService.addRegion(this.regionModel).subscribe(data => {
      this.regionData = new MatTableDataSource<PeriodicElement>(data);
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
  showCurrency(elem) {
    this.selectedCurrency = this.regions.filter(data => data.regionName.indexOf(elem) !== -1);
this.currencyValue = this.selectedCurrency[0].currency;
  }
 /*  regionVerify(elem) {
    if (elem === '') {
      this.showRegionName = false;
    } else {
      this.regionNameFilter = this.regionDetail.filter(data => data.regionName.indexOf(elem) !== -1);
      if (this.regionNameFilter.length !== 0) {
  this.showRegionName = true;
      } else if (this.regionNameFilter.length === 0 ) {
        this.showRegionName = false;
      }
    }
  } */
  deleteRegion(element) {
    this.settingsService.deleteRegion(element).subscribe(data => {
      this.regionData = new MatTableDataSource<PeriodicElement>(data);
    }, err => {
      console.log(err);
    });
  }
}
