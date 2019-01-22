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
  productModel: Product[];
  productData;
  message;
  action;
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productData = new MatTableDataSource<PeriodicElement>(data);
       /*  data.forEach(element => {
        console.log('single object');
        this.productModel.push(element);
      }); */
    }, err => {
      console.log(err);
    });
  }
  deleteProduct(product) {
    this.message = 'Product deleted';
    this.productService.deleteProduct(product).subscribe(data => {
      this.productData = new MatTableDataSource<PeriodicElement>(data);
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, err => {
      console.log(err);
    });
  }
  viewProduct(product) {
    this.router.navigate(['/product/productdetail', product._id ]);
  }
}
