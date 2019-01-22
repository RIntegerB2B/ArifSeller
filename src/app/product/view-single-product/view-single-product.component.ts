import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../add-product/product.model';

@Component({
  selector: 'app-view-single-product',
  templateUrl: './view-single-product.component.html',
  styleUrls: ['./view-single-product.component.css']
})
export class ViewSingleProductComponent implements OnInit {
  productModel: Product;
  productData;
  productId;
  primeHide: boolean;
  showImages: boolean;
  showRelatedProducts;
  selectedImg;
  relatedProducts = [];
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProductById();
  }
  getProductById() {
    this.productService.getProductById(this.productId).subscribe(data => {
      if (data.styleCode === '' || data.styleCode === undefined || data.styleCode === null) {
        this.showRelatedProducts = false;
        this.productModel = data;
      } else {
        this.showRelatedProducts = true;
        this.productService.getRelatedProducts(data).subscribe(relatedProductData => {
          relatedProductData.forEach(element => {
            if (element._id !== this.productId) {
              this.relatedProducts.push(element);
            }
          });
          this.productModel = relatedProductData.find(e => e._id === this.productId);
        }, err => {
          console.log(err);
        });
      }
    }, err => {
      console.log(err);
    });
  }

  clickImg(data) {
    this.primeHide = true;
    this.showImages = true;
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
}
