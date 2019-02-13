import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import {SuperCategory} from './superCategory.model';
import {CategoryService} from '../category.service';
export interface PeriodicElement {
  categoryName: string;
  description: string;

}

@Component({
  selector: 'app-super-category',
  templateUrl: './super-category.component.html',
  styleUrls: ['./super-category.component.css']
})
export class SuperCategoryComponent implements OnInit {
  superCategoryForm: FormGroup;
  superCategoryModel: SuperCategory;
  categoryFilter;
  superCategoryFilter: SuperCategory[];
  superCategoryData;
  checKCategoryName = false;
  displayedColumns: string[] = ['categoryName',  'description', 'edit', 'delete'];
  showCategoryName: boolean;
  categoryValue = [];
  cat;
  showEditCategory: boolean;
  message;
  action;
  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService, private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.createForm();
    this.getSuperCategory();
  }
  createForm() {
    this.superCategoryForm = this.fb.group({
      _id: [''],
      categoryName: ['', Validators.required],
      description: [''],
      uName: [''],
      uDesc: ['']
    });
  }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      this.superCategoryFilter = data;
    });
  }
  editGridRow(val) {
    this.superCategoryFilter.forEach(element => {
      if ( element._id === val._id) {
        element.editing = true;
      } else {
        element.editing = false;
      }
    });
  }
  cancel(cat) {
    cat.editing = false;
  }
  addSuperCategory() {
    this.message = 'Super Category Added successfully';
    this.superCategoryModel = new SuperCategory(
      this.superCategoryForm.controls.categoryName.value,
      this.superCategoryForm.controls.description.value,
    );
    this.categoryService.addSuperCategory(this.superCategoryModel).subscribe(data => {
      this.superCategoryFilter = data;
      this.snackBar.open(this.message, this.action , {
        duration: 3000,
      });
    });
    /* this.superCategoryForm.reset(); */
  }
  updateCategory(id, name, desc) {
    this.message = 'Super Category Updated successfully';
    this.superCategoryModel = new SuperCategory(
      name.value,
     desc.value,
    );
    this.superCategoryModel._id = id.value;
    this.categoryService.updateSuperCategory(this.superCategoryModel).subscribe(data => {
      this.snackBar.open(this.message, this.action , {
        duration: 3000,
      });
      this.superCategoryFilter = data;
    }, err  => {
      console.log(err);
    });
    }
  deleteSuperCategory(value) {
    this.message = 'Super Category Deleted successfully';
    this.categoryService.deleteSuperCategory(value).subscribe(deleteData => {
      this.superCategoryFilter = deleteData;
      this.snackBar.open(this.message, this.action , {
        duration: 3000,
      });
    });
  }
  categoryVerify(val) {
    this.checKCategoryName = false;
    this.superCategoryFilter.forEach(element => {
      if (element.categoryName === val ) {
        element.checkCategoryName = true;
        this.checKCategoryName = true;
      } else {
        element.checkCategoryName = false;
      }
    });
  }
}



