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
  superCategoryData;
  displayedColumns: string[] = ['categoryName', 'description', 'edit', 'delete'];
  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService ) { }

  ngOnInit() {
    this.createForm();
    this.getSuperCategory();
  }
  createForm() {
    this.superCategoryForm = this.fb.group({
      id: [''],
      categoryName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
    });
  }
  addSuperCategory() {
    this.superCategoryModel = new SuperCategory(
      this.superCategoryForm.controls.categoryName.value,
      this.superCategoryForm.controls.description.value,
    );
    this.categoryService.addSuperCategory(this.superCategoryModel).subscribe(data => {
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
    });
    /* this.superCategoryForm.reset(); */
  }
  deleteSuperCategory(value) {
    this.categoryService.deleteSuperCategory(value).subscribe(deleteData => {
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(deleteData);
    });
  }
}
