import { Component, OnInit , ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {RegModel} from './customer.model';
import {RegionService} from '../region.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'mobileNumber', 'emailId', 'location', 'gender'];
  customerDetails: RegModel[];
  customerData: any;
  serviceUrl;

  constructor(private router: Router, private regionService: RegionService) { }

  ngOnInit() {
    this.serviceUrl = localStorage.getItem('selectedRegion');
    console.log(this.serviceUrl, 'url');
    this.viewCustomers();
  }
  viewCustomers() {
    this.regionService.getCustomers(this.serviceUrl).subscribe(data => {
      console.log('cust', data);
      this.customerDetails = data;
      this.customerData = data;
      this.customerData = new MatTableDataSource<RegModel>(data);
      this.customerData.sort = this.sort;
      this.customerData.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }
}
