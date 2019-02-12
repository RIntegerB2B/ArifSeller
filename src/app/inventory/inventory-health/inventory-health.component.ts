import { Component, OnInit, EventEmitter, Output , ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import {Inventory} from './inventory.model';
import {InventoryService} from '../inventory.service';
import {Product} from '../../product/add-product/product.model';

export interface PeriodicElement {
  primeImage: string;
 productInformation: string;
 styleCode: string;
 skuCode: string;
 view: string;
  delete: string;
}

@Component({
  selector: 'app-inventory-health',
  templateUrl: './inventory-health.component.html',
  styleUrls: ['./inventory-health.component.css']
})
export class InventoryHealthComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['primeImage', 'productTitle', 'styleCode', 'skuCode', 'mfdQty'];
  productModel: Product[];
  productData;
  message;
  action;
  inventoryLength;
  constructor(private fb: FormBuilder, private router: Router, private inventoryService: InventoryService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  this.getInventory();
  }
getInventory() {
  this.inventoryService.showInventory().subscribe(data => {
    console.log(data);
    this.inventoryLength = data.length;
    this.productData = new MatTableDataSource<PeriodicElement>(data);
    this.productData.sort = this.sort;
    this.productData.paginator = this.paginator;
  });
}
viewSingleProduct(elem) {
  this.router.navigate(['/inventory/singleinventory', elem._id ]);
}
}
