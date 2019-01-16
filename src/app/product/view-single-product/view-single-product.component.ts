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
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
      this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProductById();
  }
getProductById() {
this.productService.getProductById(this.productId).subscribe(data => {
  console.log(data);
}, err => {
  console.log(err);
});
}
}
