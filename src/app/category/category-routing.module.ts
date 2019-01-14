import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {SuperCategoryComponent} from './super-category/super-category.component';


const routes: Routes = [{
  path: 'supercategory',
  component: SuperCategoryComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
