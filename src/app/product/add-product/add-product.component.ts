import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material';

import { ProductService } from '../product.service';
import { PrimeImageData } from './primeImageData.model';
import { Product } from './product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  productModel: Product;
  message;
  action;

  fileToUpload: File = null;
  reader: FileReader = new FileReader();
  portFolioImageBlob: Blob;
  portFolioImageBytes: Uint8Array;
  primeImageData: PrimeImageData = new PrimeImageData();
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.productForm = this.fb.group({
      id: [''],
      productTitle: [''],
      productName: [''],
      productDescription: [''],
      shortDescription: [''],
      price: [''],
      color: [''],
      styleCode: [''],
      skuCode: ['']
    });
  }
  handleFileInput(files: FileList, loadedImage) {
    this.fileToUpload = files.item(0);
    this.primeImageData.primeImage = this.fileToUpload = files[0];
    this.reader.readAsArrayBuffer(this.fileToUpload);
    this.reader.onload = () => {
      const fileResult = this.reader.result;
      this.portFolioImageBytes = new Uint8Array(fileResult);
      this.portFolioImageBlob = new Blob([this.portFolioImageBytes.buffer]);
      const reader1 = new FileReader();
      reader1.readAsDataURL(this.portFolioImageBlob);
      reader1.onload = (e: Event & { target: { result: string } }) => {
        loadedImage.src = reader1.result;
      };
    };

  }
  addProducts() {
    this.message = 'Product added successfully';
    this.productModel = new Product();
    this.productModel.productTitle = this.productForm.controls.productTitle.value;
    this.productModel.productName = this.productForm.controls.productName.value;
    this.productModel.productDescription = this.productForm.controls.productDescription.value;
    this.productModel.shortDescription = this.productForm.controls.shortDescription.value;
    this.productModel.price = this.productForm.controls.price.value;
    this.productModel.color = this.productForm.controls.color.value;
    this.productModel.styleCode = this.productForm.controls.styleCode.value;
    this.productModel.skuCode = this.productForm.controls.skuCode.value;
    this.productModel.primeImageName = this.primeImageData.primeImage.name;
    this.productService.addProduct(this.productModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
    this.uploadImage(this.productForm.controls.skuCode.value);
    this.router.navigate(['/product/viewproducts']);

  }
  uploadImage(skucode) {
    this.productService.uploadprimeImage(this.primeImageData, skucode).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
}
