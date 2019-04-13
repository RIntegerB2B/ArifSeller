import { Component, OnInit } from '@angular/core';
import {Route, ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {RegionService} from '../region.service';
import {Order} from '../view-region-orders/orders.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css']
})
export class ViewOrderDetailsComponent implements OnInit {
  id;
orderModel: Order;
orderForm: FormGroup;
productModel: any;
message;
action;
serviceUrl;
OrderStatus = ['New', 'Processing', 'OnHold', 'Completed' , 'Cancelled', 'Failed'];
  constructor(private router: Router,  private regionService: RegionService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.serviceUrl = localStorage.getItem('selectedRegion');
    this.createForm();
    this.viewOrderDetails();
    this.getProducts();
  }
  createForm() {
this.orderForm = this.fb.group({
orderedDate: [''],
statusType: ['']
});
  }
viewOrderDetails() {
  this.regionService.getSingleOrderDetails(this.serviceUrl, this.id).subscribe(data => {
    this.orderModel = data[0];
  }, err => {
console.log(err);
  });
}
getProducts() {
  this.regionService.getProducts(this.serviceUrl).subscribe(data => {
    this.productModel = data;
  }, err => {
    console.log(err);
  });
}
}
