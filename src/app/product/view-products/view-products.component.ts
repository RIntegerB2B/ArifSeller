import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { ProductService } from '../product.service';
import { Product } from '../add-product/product.model';

export interface PeriodicElement {
  primeImage: string;
  productName: string;
  productTitle: string;
  styleCode: string;
  skuCode: string;
  view: string;
  delete: string;
}


@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  displayedColumns: string[] = ['primeImage', 'productName', 'productTitle', 'styleCode', 'skuCode', 'view', 'delete'];
  productModel: Product;
  productData;
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productData = new MatTableDataSource<PeriodicElement>(data);
    }, err => {
      console.log(err);
    });
  }
  deleteProduct(product) {
    this.productService.deleteProduct(product).subscribe(data => {
      this.productData = new MatTableDataSource<PeriodicElement>(data);
    }, err => {
      console.log(err);
    });
  }
  viewProduct(product) {
    this.router.navigate(['/product/productdetail', product._id ]);
console.log(product._id);

  }
}
