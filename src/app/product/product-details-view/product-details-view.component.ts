import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../add-product/product.model';
import { ProductService } from './../../product/product.service';

import { Region } from '../../product/add-product/region.model';
@Component({
  selector: 'app-product-details-view',
  templateUrl: './product-details-view.component.html',
  styleUrls: ['./product-details-view.component.css']
})
export class ProductDetailsViewComponent implements OnInit {
  regionModel: Region[];
  @Input() productModel: Product;
  @Input() mainCatergoryName: string;
  editProductForm: FormGroup;
  regionData: Region;
  message;
  action;
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.editProductForm = this.fb.group({
      regionName: [''],
      editQty: [''],
      editPrice: ['']
    });
  }
  editQty(elem) {
    elem.qtyediting = true;
  }
  update(data, elem, name, price , value) {
    this.message = 'Product updated successfully';
    data.qtyediting = false;
    this.regionData = new Region();
    this.regionData.regionName = name;
    this.regionData.regionPrice = price;
    this.regionData.regionQuantity = value;
    this.productService.editRegionDetails( elem._id, data._id,  this.regionData).subscribe(val => {
      this.productModel = val;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    });
  }
  cancel(data) {
    data.qtyediting = false;
  }
}
