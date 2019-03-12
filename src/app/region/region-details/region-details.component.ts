import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import {RegionService} from '../region.service';

import {Region} from '../../settings/region/region.model';
import {Product} from '../../product/add-product/product.model';

@Component({
  selector: 'app-region-details',
  templateUrl: './region-details.component.html',
  styleUrls: ['./region-details.component.css']
})
export class RegionDetailsComponent implements OnInit {
  regionModel: Region;
  productModel: Product;
  id;
  serviceUrl;
  constructor(private fb: FormBuilder, private router: Router, private regionService: RegionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getDetails();
  }
getDetails() {
  this.regionService.getSpecificRegion(this.id).subscribe(data => {
this.serviceUrl = data[0].domainRegion;
this.getProducts(this.serviceUrl);
  }, err => {
    console.log(err);
  });
}
getProducts(serviceUrl) {
this.regionService.getProducts(serviceUrl).subscribe(data => {
this.productModel = data;
}, err => {
  console.log(err);
});
}
}
