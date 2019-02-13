import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { ProductService } from '../product.service';
import { Product } from './product.model';
import { MainCategory } from '../../category/main-category/mainCategory.model';
import { MOQ } from '../../moq/create-moq/moq.model';
import { SuperCategory } from '../../category/super-category/superCategory.model';
import { priceValue } from '../../shared/validation/price-validation';
import { SettingsService } from './../../settings/settings.service';
import { Region } from './region.model';
import { MatTabChangeEvent, MatTab } from '@angular/material';


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
  selectedIndex = 0;
  matTab: MatTab;
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
  categories;
  superCategoryName;
  mainCategoryName;
  showMainCategory: boolean;
  showMainCategoryError: boolean;
  showCategory: boolean;
  showSelectedMOQ: boolean;
  category;
  mainCategory;
  moqName;
  imageError: boolean;

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
  waterProofValue = ['Yes', 'No'];
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
      length: [''],
      breadth: [''],
      height: [''],
      material: [''],
      waterProof: [''],
      laptopSize: [''],
      closure: [''],
      compartments: [''],
      pockets: [''],
      mfdQty: ['', priceValue],
      confirmRegion: this.fb.array([
      ])
    });
  }
  selectedIndexChange(val: number) {
    this.selectedIndex = val;
  }
  selectNextTab(tab) {
    if (tab !== 4) {
      this.selectedIndex = tab + 1;
    } else {
      this.selectedIndex = 4;
    }
  }
  selectPreviousTab(tab) {
    if (tab !== 0) {
      this.selectedIndex = tab - 1;
    } else {
      this.selectedIndex = 0;
    }
  }
  get regionForms() {
    return this.productForm.get('confirmRegion') as FormArray;
  }
  selectAllRegion() {
    for (let i = 0; i <= this.regionDetail.length - 1; i++) {
      const data = this.fb.group({
        regionName: [this.regionDetail[i].regionName],
        regionPrice: ['', priceValue],
        regionQuantity: ['', priceValue]
      });
      this.regionForms.push(data);
    }
  }
  selectedCountry(test, inputRegionName) {
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
    this.superCategoryName = val.categoryName;
    this.filteredSuperCategory = this.superCategoryModel.filter(data => data._id === val._id);
    this.mainCategoryModel = this.filteredSuperCategory[0].mainCategory;
    if (this.mainCategoryModel.length !== 0) {
      this.showMainCategory = true;
      this.showMainCategoryError = false;
      this.showCategory = false;
    } else {
      this.showMainCategory = false;
      this.showMainCategoryError = true;
      this.showCategory = false;
    }
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
    if (e.checked === true) {
      this.regionSelectName = region.regionName;
    } else {
      this.regionSelectName = '';
    }
  }

  handleFileInput(images: any) {
    this.imageError = false;
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
    this.categories = categoryVal._id;
    this.showCategory = true;
  }
  deleteCategory(data) {
    const index = this.categories.indexOf(data);
    if (index > -1) {
      this.categories.splice(index, 1);
    }
  }
  skuCodeVerify(elem) {
    this.productDetail.forEach(element => {
      if (element.skuCode === elem) {
element.skuCodeVerify = true;
      } else {
        element.skuCodeVerify = false;
      }
    });
  }
  selectedMOQ(event, data) {
    this.moqId = data._id;
    this.moqName = data.moqName;
    this.showSelectedMOQ = true;
  }
  validateProducts() {
    if (this.productForm.controls.productName.value === '' || this.productForm.controls.skuCode.value === ''
      || this.fileToUpload === undefined || this.productForm.controls.styleCode.value === '') {
      this.selectedIndex = 0;
      if (this.fileToUpload === undefined) {
        this.imageError = true;
      } else {
        this.imageError = false;
      }
    } else {
      this.addProducts();
    }
  }
  addProducts() {
    this.message = 'Product added successfully';
    this.productModel = new Product();
    this.productModel.productName = this.productForm.controls.productName.value;
    this.productModel.productDescription = this.productForm.controls.productDescription.value;
    this.productModel.price = this.productForm.controls.price.value;
    this.productModel.color = this.productForm.controls.color.value;
    this.productModel.mfdQty = this.productForm.controls.mfdQty.value;
    this.productModel.styleCode = this.productForm.controls.styleCode.value.toUpperCase();
    this.productModel.skuCode = this.productForm.controls.skuCode.value.toUpperCase();
    this.productModel.moq = this.moqId;
    // category
    this.productModel.mainCategory = this.categories;
    // size
    this.productModel.length = this.productForm.controls.length.value;
    this.productModel.breadth = this.productForm.controls.breadth.value;
    this.productModel.height = this.productForm.controls.height.value;
    // detials
    this.productModel.material = this.productForm.controls.material.value;
    this.productModel.waterProof = this.productForm.controls.waterProof.value;
    this.productModel.laptopSize = this.productForm.controls.laptopSize.value;
    this.productModel.closure = this.productForm.controls.closure.value;
    this.productModel.compartments = this.productForm.controls.compartments.value;
    this.productModel.pockets = this.productForm.controls.pockets.value;
    this.productModel.region = this.confirmRegion;
    this.productService.addProduct(this.productModel).subscribe(data => {
      this.productId = data._id;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.uploadImages(this.productModel.skuCode);

    }, error => {
      console.log(error);
    });
  }
  uploadImages(skucode) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.productService.uploadImages(formData, skucode).subscribe(data => {
      this.redirect();
    }, error => {
      console.log(error);
    });
  }
  redirect() {
    this.router.navigate(['product/viewproducts']);
  }
}
