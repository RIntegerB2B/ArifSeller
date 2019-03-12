import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import {RegionService} from '../region.service';

import {Region} from '../../settings/region/region.model';

@Component({
  selector: 'app-all-regions',
  templateUrl: './all-regions.component.html',
  styleUrls: ['./all-regions.component.css']
})
export class AllRegionsComponent implements OnInit {
regionModel: Region;
  constructor(private fb: FormBuilder, private router: Router, private regionService: RegionService) { }

  ngOnInit() {
    this.getAllRegions();
  }
getAllRegions() {
  this.regionService.getAllRegions().subscribe(data => {
    this.regionModel = data;
  }, err => {
    console.log(err);
  });
}
viewRegion(data) {
  console.log(data);
  this.router.navigate(['/regions/region', data._id]);
}
}
