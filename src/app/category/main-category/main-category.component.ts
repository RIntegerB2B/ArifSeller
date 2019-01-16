import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material';

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
      description: ['', Validators.required]
    });
  }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    });
  }
  setNewUser(id) {
    this.headerCatSelectedData = id;
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
  getCategory(id) {
    this.headCatSelected = id;
    this.categoryService.getMainCategory(id).subscribe(data => {
      this.mainCategoryData = new MatTableDataSource<PeriodicElement>(data.mainCategory);
    }, error => {
      console.log(error);
    });
  }
  deleteMainCategory(elem) {
    this.message = 'Main Category deleted';
this.categoryService.deleteMainCategory(this.headCatSelected, elem).subscribe(data => {
  this.snackBar.open(this.message, this.action, {
    duration: 3000,
  });
  this.mainCategoryData = new MatTableDataSource<PeriodicElement>(data);
}, error => {
  console.log(error);
});
  }
}
