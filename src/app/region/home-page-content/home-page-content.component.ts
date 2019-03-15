import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { RegionService } from '../region.service';

import { Region } from '../../settings/region/region.model';
import {Banner} from './banner.model';
import {Promotion} from './promotions.model';

export interface PeriodicElement {
  bannerName: string;
  bannerPosition: string;
  status: string;
  delete: string;
}
@Component({
  selector: 'app-home-page-content',
  templateUrl: './home-page-content.component.html',
  styleUrls: ['./home-page-content.component.css']
})
export class HomePageContentComponent implements OnInit {
  showBanner: boolean;
  showApprovedBanner: boolean;
  showHeaderTable: boolean;
  showApprovedHeader: boolean;
  showCategoryContent:  boolean;
  showApprovedCategoryContent:  boolean;
  showPromotions: boolean;
  showApprovedPromotions: boolean;
  promotionModel: Promotion;
  bannerModel: Banner;
  regionModel: Region;
  id;
  serviceUrl;
  displayedColumns: string[] = ['imageName', 'Position', 'status',  'approve'];
  displayedColumns1: string[] = ['imageName',  'status',  'approve'];
  bannerData;
  adsData;
  headersData;
  promotionsData;
  constructor(private fb: FormBuilder, private router: Router, private regionService: RegionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getBannerDetails();
  }
  getHeaders() {
    this.serviceUrl = localStorage.getItem('selectedRegion');
      this.showHeaderTable = true;
      this.showBanner = false;
      this.showApprovedHeader = false;
      this.showApprovedBanner = false;
      this.showApprovedCategoryContent = false;
      this.showApprovedPromotions = false;
      this.showCategoryContent = false;
      this.showPromotions = false;
    this.regionService.getUnApprovedHeaders(this.serviceUrl).subscribe(data => {
      this.headersData = new MatTableDataSource<PeriodicElement>(data);
      /* this.headersData = data; */
      console.log('header data', data);
    }, err => {
      console.log(err);
    });
  }
  approveHeader(data) {
    this.regionService.approveHeader(this.serviceUrl, data._id).subscribe(val => {
      this.headersData = new MatTableDataSource<PeriodicElement>(val);
    }, err => {
      console.log(err);
    });
  }
getBannerDetails() {
  this.serviceUrl = localStorage.getItem('selectedRegion');
this.regionService.getUnApprovedBanners(this.serviceUrl).subscribe(data => {
  this.bannerData = new MatTableDataSource<PeriodicElement>(data);
  this.bannerModel = data;
  this.showBanner = true;
  this.showHeaderTable = false;
  this.showApprovedHeader = false;
  this.showApprovedBanner = false;
  this.showApprovedCategoryContent = false;
  this.showApprovedPromotions = false;
  this.showCategoryContent = false;
  this.showPromotions = false;
}, err => {
  console.log(err);
});
}
approveBanner(data) {
this.regionService.approveBanner(this.serviceUrl, data._id).subscribe(val => {
  this.bannerData = new MatTableDataSource<PeriodicElement>(val);
  this.bannerModel = val;
  console.log( this.bannerData);
}, err => {
  console.log(err);
});
}
approvedBanner() {
  this.showCategoryContent = false;
  this.showBanner = false;
  this.showPromotions = false;
  this.showHeaderTable = false;
  this.showApprovedHeader = false;
  this.showApprovedBanner = true;
  this.showApprovedCategoryContent = false;
  this.showApprovedPromotions = false;
  this.regionService.getApprovedBanners(this.serviceUrl).subscribe(val => {
    this.bannerData = new MatTableDataSource<PeriodicElement>(val);
    this.bannerModel = val;
    console.log( this.bannerData);
  }, err => {
    console.log(err);
  });
  }
  approvedHeader() {
    console.log('approved header');
    this.showCategoryContent = false;
    this.showBanner = false;
    this.showPromotions = false;
    this.showHeaderTable = false;
    this.showApprovedHeader = true;
    this.showApprovedBanner = false;
    this.showApprovedCategoryContent = false;
    this.showApprovedPromotions = false;
    this.regionService.getApprovedHeader(this.serviceUrl).subscribe(val => {
      this.headersData = new MatTableDataSource<PeriodicElement>(val);
    }, err => {
      console.log(err);
    });
    }
getCategoryContent() {
  this.showCategoryContent = true;
  this.showBanner = false;
  this.showPromotions = false;
  this.showApprovedBanner = false;
  this.showHeaderTable = false;
  this.showApprovedHeader = false;
  this.showApprovedCategoryContent = false;
  this.showApprovedPromotions = false;
  this.serviceUrl = localStorage.getItem('selectedRegion');
  this.regionService.getUnApprovedCategory(this.serviceUrl).subscribe(data => {
    this.adsData = new MatTableDataSource<PeriodicElement>(data);
    console.log('category', this.adsData);
  }, err => {
    console.log(err);
  });
}
approvedAds(data) {
  this.showCategoryContent = false;
  this.showBanner = false;
  this.showPromotions = false;
  this.showApprovedBanner = false;
  this.showApprovedCategoryContent = true;
  this.showApprovedPromotions = false;
  this.showHeaderTable = false;
  this.showApprovedHeader = false;
  this.serviceUrl = localStorage.getItem('selectedRegion');
  this.regionService.getApprovedCategory(this.serviceUrl).subscribe(val => {
    this.adsData = new MatTableDataSource<PeriodicElement>(val);
    this.adsData = val;
  }, err => {
    console.log(err);
  });
}
approveAds(data) {
  this.regionService.approveCategory(this.serviceUrl, data._id).subscribe(val => {
    this.adsData = new MatTableDataSource<PeriodicElement>(val);
    this.adsData = val;
  }, err => {
    console.log(err);
  });
}
getPromotions() {
  this.showPromotions = true;
  this.showCategoryContent = false;
  this.showBanner = false;
  this.showApprovedBanner = false;
  this.showApprovedCategoryContent = false;
  this.showApprovedPromotions = false;
  this.showHeaderTable = false;
  this.showApprovedHeader = false;
  this.serviceUrl = localStorage.getItem('selectedRegion');
  this.regionService.getUnApprovedPromotions(this.serviceUrl).subscribe(data => {
    this.promotionsData = new MatTableDataSource<PeriodicElement>(data);
  }, err => {
    console.log(err);
  });
}
approvePromotions(data) {
  this.regionService.approvePromotions(this.serviceUrl, data._id).subscribe(val => {
    this.promotionsData = new MatTableDataSource<PeriodicElement>(val);
    this.promotionsData = val;
  }, err => {
    console.log(err);
  });
}
approvedPromotions(data) {
  this.showPromotions = false;
  this.showCategoryContent = false;
  this.showBanner = false;
  this.showApprovedBanner = false;
  this.showApprovedCategoryContent = false;
  this.showApprovedPromotions = true;
  this.showHeaderTable = false;
  this.showApprovedHeader = false;
  this.regionService.getApprovedPromotions(this.serviceUrl).subscribe(val => {
    this.promotionsData = new MatTableDataSource<PeriodicElement>(val);
    this.promotionsData = val;
  }, err => {
    console.log(err);
  });
}
}
