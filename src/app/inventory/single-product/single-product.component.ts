import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../product/add-product/product.model';
import {Region} from '../../product/add-product/region.model';
import { MainCategory } from '../../category/main-category/mainCategory.model';
import {InventoryService} from '../inventory.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  regionModel: Region[];
  productModel: Product;
  productData;
  productId;
  primeHide: boolean;
  showImages: boolean;
  mainCategory: MainCategory[];
  showRelatedProducts;
  selectedImg;
  selectedSmallImg: any;
  relatedProducts = [];
  color = 'red';
  mainCatergoryName: string;
  editInventoryForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private inventoryService: InventoryService, private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
   }

   ngOnInit() {
    this.getProductById();
    this.createForm();
  }
createForm() {
  this.editInventoryForm = this.fb.group({
    editQty: ['']
  });
}
  getProductById() {
    this.inventoryService.getProductById(this.productId).subscribe(data => {
      this.productModel = data;
      this.regionModel = data.region;
      console.log('single product', data);
    }, err => {
      console.log(err);
    });
  }

  getCategory()  {
    this.inventoryService.showAllMainCategory().subscribe(data => {
      this.mainCategory = data;
      this.mainCategory.forEach(element => {
        if (element._id === this.productModel.mainCategory)         {
          this.mainCatergoryName = element.mainCategoryName;
        }
      });
    }, err => {
      console.log(err);
    });
  }
  clickImg(data) {
    this.primeHide = true;
    this.showImages = true;
    this.selectedSmallImg = data;
    this.selectedImg = data;
  }
  relatedProduct(element) {
    this.relatedProducts.push(this.productModel);
    this.productModel = element;
    this.primeHide = false;
    this.showImages = false;
    const index = this.relatedProducts.indexOf(element);
    if (index !== -1) {
      this.relatedProducts.splice(index, 1);
    }
  }
  editQty(elem) {
    this.regionModel.forEach(element => {
      if (element === elem) {
element.qtyediting = true;
      } else {
        element.qtyediting = false;
      }
    });
     }
}
