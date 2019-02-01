import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { ProductService } from '../product.service';
import { Product } from './product.model';
import { MainCategory } from '../../category/main-category/mainCategory.model';
import { MOQ } from '../../moq/create-moq/moq.model';
import {SuperCategory} from '../../category/super-category/superCategory.model';
import { priceValue } from '../../shared/validation/price-validation';
import { SettingsService } from './../../settings/settings.service';
import { Region } from './region.model';


export interface PeriodicElement {
  /*  primeImage: string; */
  moqName: string;
  moqDescription: string;
  moqQuantity: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  productModel: Product;
  productDetail: Product[];
  regionDetail: Region[];
  moqModel: MOQ;
  mainCategoryModel = new Array();
  superCategoryModel: SuperCategory[];
  filteredSuperCategory = new Array();
  message;
  action;
  productId;
  moqId;
  searchText;
  showSkuError: boolean;
  skuFilter;
  categories = [];
  superCategoryName;
  mainCategoryName;
  showMainCategory: boolean;
  showCategory: boolean;
  showSelectedMOQ: boolean;
  category;
  mainCategory;
  moqName;

  fileLength;
  selectRegion: number;
  fileToUpload;
  urls = new Array<string>();
  localArray: any = [];
  selected: string;
  regionSelectName;
  arryValue: any = [];
  confirmRegion: any = [];
  countryFilter = [];
  countryError;
  priceError: boolean;
  selecteValue: any = [];
  reader: FileReader = new FileReader();
  displayedColumns: string[] = ['moqName', 'moqDescription', 'moqQuantity'];
  moqData;
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getRegions();
    this.createForm();
    this.showSuperCategory();
    this.showMOQ();
    this.getProducts();
    /* this.addProducts(); */
  }
  createForm() {
    this.productForm = this.fb.group({
      id: [''],
      productName: [''],
      productDescription: [''],
      price: ['', priceValue],
      size: [''],
      color: [''],
      styleCode: [''],
      skuCode: [''],
      skuCodeValue: [''],
      region: [''],
      confirmRegion: this.fb.array([
      ])
    });
  }

  get regionForms() {
    return this.productForm.get('confirmRegion') as FormArray;
  }
  selectedMOQ(data) {
    this.moqName = data.moqName;
    this.showSelectedMOQ = true;
  }
  selectAllRegion() {
    for (let i = 0; i <= this.regionDetail.length - 1; i++) {
      const data = this.fb.group({
        regionName: [this.regionDetail[i].regionName],
        regionPrice: ['', Validators.required],
        regionQuantity: ['', Validators.required]
      });
      this.regionForms.push(data);
    }
  }
  selectedCountry(test, inputRegionName)   {
    this.countryFilter =
     this.confirmRegion.filter(data => data.regionName.indexOf(inputRegionName) !== -1);
    if (this.countryFilter.length !== 0) {
      this.countryError = true;
    } else {
      this.countryError = false;
      this.confirmRegion.push(test);
    }
  }
  selectedSuperCategory(val) {
    this.category = val;
    this.showMainCategory = true;
    this.superCategoryName = val.categoryName;
  this.filteredSuperCategory =  this.superCategoryModel.filter(data => data._id === val._id);
    this.mainCategoryModel = this.filteredSuperCategory[0].mainCategory;
  }
  deleteCountry(data) {
    this.countryError = false;
    const index = this.confirmRegion.indexOf(data);
    if (index > -1) {
      this.confirmRegion.splice(index, 1);
    }
  }

  addNewRegion(e, region) {
    this.countryError = false;
    this.countryFilter =
     this.confirmRegion.filter(data => data.regionName.indexOf(region.regionName) !== -1);
    if (e.checked === true)     {
    this.regionSelectName = region.regionName;
  } else {
    this.regionSelectName = '';
  }
  }

  handleFileInput(images: any) {
    this.fileToUpload = images;
    this.urls = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  }
  showMOQ() {
    this.productService.showMoq().subscribe(data => {
      this.moqModel = data;
      this.moqData = new MatTableDataSource<PeriodicElement>(data);
    }, err => {
      console.log(err);
    });
  }
  getRegions() {
    this.productService.getAllRegions().subscribe(data => {
      this.regionDetail = data;
      console.log(this.regionDetail);
      this.selectAllRegion();
    }, err => {
      console.log(err);
    });
  }
  showSuperCategory() {
    this.productService.showAllSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    }, err => {
      console.log(err);
    });
  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productDetail = data;
    }, err => {
      console.log(err);
    });
  }

  selectedCategory(categoryVal) {
this.mainCategory = categoryVal.mainCategoryName;
this.showCategory = true;
  }
  deleteCategory(data) {
    const index = this.categories.indexOf(data);
    if (index > -1) {
      this.categories.splice(index, 1);
    }
      }
  skuCodeVerify(elem) {
    this.skuFilter = this.productDetail.filter(data => data.skuCode.indexOf(elem) !== -1);
    if (this.skuFilter.length !== 0) {
      this.showSkuError = true;
    } else if (this.skuFilter.length === 0) {
      this.showSkuError = false;
    }
  }
  addProducts() {
    this.message = 'Product added successfully';
    this.productModel = new Product();
    this.productModel.productName = this.productForm.controls.productName.value;
    this.productModel.productDescription = this.productForm.controls.productDescription.value;
    this.productModel.price = this.productForm.controls.price.value;
    this.productModel.color = this.productForm.controls.color.value;
    this.productModel.styleCode = this.productForm.controls.styleCode.value;
    this.productModel.color = this.productForm.controls.color.value;
    this.productModel.skuCode = this.productForm.controls.skuCode.value;
    this.productModel.productDescription = this.productForm.controls.productDescription.value;
    this.productModel.region = this.confirmRegion;
    console.log(this.productModel);
    this.productService.addProduct(this.productModel).subscribe(data => {
      this.productId = data._id;
      /* this.addProductToMoq(); */
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      /* this.router.navigate(['product/viewproducts']); */
    }, error => {
      console.log(error);
    });
 /*    this.uploadImages(this.productModel.skuCode); */
  }
  getMoq(elem) {
    this.moqId = elem;
  }
  uploadImages(skucode) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.productService.uploadImages(formData, skucode).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
  addProductToMoq() {
    this.productService.addMOQ(this.moqId, this.productId).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
}
