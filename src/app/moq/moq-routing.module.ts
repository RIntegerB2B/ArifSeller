import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {CreateMoqComponent} from './create-moq/create-moq.component';

const routes: Routes = [{
  path: 'createmoq',
  component: CreateMoqComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoqRoutingModule { }
