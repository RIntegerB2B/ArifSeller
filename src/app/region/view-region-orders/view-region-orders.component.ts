import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import {RegionService} from '../region.service';

import {Order} from './orders.model';

export interface PeriodicElement {
  orderId: string;
  orderDate: string;
  status: string;
}

@Component({
  selector: 'app-view-region-orders',
  templateUrl: './view-region-orders.component.html',
  styleUrls: ['./view-region-orders.component.css']
})
export class ViewRegionOrdersComponent implements OnInit {
  serviceUrl;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['order', 'view', 'date', 'status', 'total'];
  orderModel: any;
  orderDetails: Order[];
  allOrderCount;
  newOrderCount;
  activeOrderCount;
  completedOrderCount;
  cancelledOrderCount;
  constructor(private fb: FormBuilder, private router: Router, private regionService: RegionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.serviceUrl = localStorage.getItem('selectedRegion');
    this.getOrders();
  }
getOrders() {
    this.regionService.getOrders(this.serviceUrl).subscribe(data => {
      console.log(this.orderModel);
      this.orderDetails = data;
      this.allOrderCount = data.length;
      this.orderModel = data;
      this.orderModel = new MatTableDataSource<Order>(data);
      this.orderModel.sort = this.sort;
      this.orderModel.paginator = this.paginator;
      this.newOrderCount = this.orderDetails.filter(book => book.orderStatus === 'New').length;
      this.activeOrderCount = this.orderDetails.filter(book => book.orderStatus === 'Processing').length;
      this.completedOrderCount = this.orderDetails.filter(book => book.orderStatus === 'Completed').length;
      this.cancelledOrderCount = this.orderDetails.filter(book => book.orderStatus === 'Cancelled').length;
    }, err => {
      console.log(err);
    });
}
viewNewOrders() {
  this.orderModel =  this.orderDetails.filter(book => book.orderStatus === 'New');
}

viewActiveOrders() {
  this.orderModel =  this.orderDetails.filter(book => book.orderStatus === 'Processing');
}
viewCompletedOrders() {
  this.orderModel =  this.orderDetails.filter(book => book.orderStatus === 'Completed');
}
viewCancelledOrders() {
  this.orderModel =  this.orderDetails.filter(book => book.orderStatus === 'Cancelled');
}
applyFilter(filterValue: string) {
  this.orderModel.filter = filterValue.trim().toLowerCase();
}

 showOrderDetails(order) {
this.router.navigate(['regions/viewordersdetails', order._id ]);
}
}
