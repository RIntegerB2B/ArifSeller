import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';

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
  displayedColumns: string[] = ['categoryName',  'description', 'edit', 'delete'];
  showCategoryName: boolean;
  categoryValue = [];
  cat;
  showEditCategory: boolean;
  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService ) { }

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
    this.superCategoryModel = new SuperCategory(
      this.superCategoryForm.controls.categoryName.value,
      this.superCategoryForm.controls.description.value,
    );
    this.categoryService.addSuperCategory(this.superCategoryModel).subscribe(data => {
      this.superCategoryFilter = data;
    });
    /* this.superCategoryForm.reset(); */
  }
  updateCategory(id, name, desc) {
    this.superCategoryModel = new SuperCategory(
      name.value,
     desc.value,
    );
    this.superCategoryModel._id = id.value;
    this.categoryService.updateSuperCategory(this.superCategoryModel).subscribe(data => {
      this.superCategoryFilter = data;
    }, err  => {
      console.log(err);
    });
    }
  deleteSuperCategory(value) {
    this.categoryService.deleteSuperCategory(value).subscribe(deleteData => {
      this.superCategoryFilter = deleteData;
    });
  }
  categoryVerify(val) {
    this.superCategoryFilter.forEach(element => {
      if (element.categoryName === val ) {
        element.checkCategoryName = true;
        this.cat = element.checkCategoryName;
      } else {
        element.checkCategoryName = false;
      }
    });
  }
}
