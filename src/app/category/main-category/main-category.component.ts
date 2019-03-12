import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { CategoryService } from '../category.service';
import { SuperCategory } from '../super-category/superCategory.model';
import { MainCategory } from './mainCategory.model';
export interface PeriodicElement {
  categoryName: string;
  description: string;

}
@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css']
})
export class MainCategoryComponent implements OnInit {
  superCategoryModel: SuperCategory;
  mainCategoryModel: MainCategory;
  mainCategoryValue: MainCategory[];
  mainCategoryForm: FormGroup;
  headerCatSelectedData;
  mainCategoryData;
  headCatSelected;
  message;
  action;
  displayedColumns: string[] = ['categoryName', 'description', 'edit', 'delete'];
  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getSuperCategory();
  }
  createForm() {
    this.mainCategoryForm = this.fb.group({
      id: [''],
      categoryName: ['', Validators.required],
      description: [''],
      _id: [''],
      uName: [''],
      uDesc: ['']
    });
  }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    });
  }
  setNewUser(category) {
    this.headerCatSelectedData = category._id;
    this.mainCategoryValue = category.mainCategory;
  }
  addMainCategory() {
    this.message = 'Main Category Added';
    this.mainCategoryModel = new MainCategory(
      this.mainCategoryForm.controls.categoryName.value,
      this.mainCategoryForm.controls.description.value,
    );
    this.mainCategoryModel._id = this.headerCatSelectedData;
    this.categoryService.addMainCategory(this.mainCategoryModel).subscribe(data => {
    }, error => {
      console.log(error);
    });
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
    });
    this.mainCategoryForm.reset();
  }
  mainCategoryVerify(val) {
    this.mainCategoryValue.forEach(data => {
      if (data.mainCategoryName === val) {
        data.mainCategoryVerify = true;
      } else {
        data.mainCategoryVerify = false;
      }
    });
  }
  getCategory(id) {
    this.headCatSelected = id;
    this.categoryService.getMainCategory(id).subscribe(data => {
      this.mainCategoryData = data.mainCategory;
    }, error => {
      console.log(error);
    });
  }
  editGridRow(cat) {
    cat.editing = true;
  }
  cancel(cat) {
    cat.editing = false;
  }
  update(id, name, desc) {
    this.message = 'Main Category updated';
    this.mainCategoryModel = new MainCategory(
      name.value,
      desc.value
    );
    this.mainCategoryModel._id = id.value;
    this.categoryService.updateMainCategory(this.headCatSelected, this.mainCategoryModel).subscribe(data => {
      this.mainCategoryData = data[0].mainCategory;
      console.log(this.mainCategoryData);
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
  deleteMainCategory(elem) {
    this.message = 'Main Category deleted';
    this.categoryService.deleteMainCategory(this.headCatSelected, elem).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.mainCategoryData = data;
    }, error => {
      console.log(error);
    });
  }
}
