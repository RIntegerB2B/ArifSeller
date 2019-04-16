import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Region} from '../settings/region/region.model';
import {Banner} from '../region/home-page-content/banner.model';
import {Promotion} from '../region/home-page-content/promotions.model';
import {Order} from '../region/view-region-orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }
  getAllRegions(): Observable<any> {
    const categoryUrl = 'regionsdetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Region>(url);
  }
  getSpecificRegion(id): Observable<any> {
    const categoryUrl = 'regions/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<Region>(url);
  }
  getProducts(serviceUrl): Observable<any> {
    const categoryUrl = 'product';
    const url: string = serviceUrl + categoryUrl ;
    return this.httpClient.get<Region>(url);
  }

  getOrders(serviceUrl): Observable<any> {
    const categoryUrl = 'allorders';
    const url: string = serviceUrl + categoryUrl ;
    return this.httpClient.get<Region>(url);
  }

<<<<<<< HEAD
  getCustomers(distService): Observable<any> {
    const categoryUrl = 'customers';
    const url: string = distService + categoryUrl ;
    return this.httpClient.get<Region>(url);
  }


=======
>>>>>>> 91ba717012811eec8fee259f10c229692a574633
  // content approval
  getUnApprovedHeaders(serviceUrl): Observable<any> {
    const categoryUrl = 'headerstoapprove';
    const url: string = serviceUrl + categoryUrl ;
    return this.httpClient.get<Banner>(url);
  }
  getUnApprovedBanners(serviceUrl): Observable<any> {
    const categoryUrl = 'bannerstoapprove';
    const url: string = serviceUrl + categoryUrl ;
    return this.httpClient.get<Banner>(url);
  }
  getApprovedBanners(serviceUrl): Observable<any> {
    const categoryUrl = 'approvedbanner';
    const url: string = serviceUrl + categoryUrl ;
    return this.httpClient.get<Banner>(url);
  }
  getUnApprovedCategory(serviceUrl): Observable<any> {
    const categoryUrl = 'categorytoapprove';
    const url: string = serviceUrl + categoryUrl ;
    return this.httpClient.get<Banner>(url);
  }
  getApprovedCategory(serviceUrl): Observable<any> {
    const categoryUrl = 'approvedCategory';
    const url: string = serviceUrl + categoryUrl ;
    return this.httpClient.get<Banner>(url);
  }
  getApprovedHeader(serviceUrl): Observable<any> {
    const categoryUrl = 'approvedheader';
    const url: string = serviceUrl + categoryUrl ;
    return this.httpClient.get<Banner>(url);
  }
  getUnApprovedPromotions(serviceUrl): Observable<any> {
    const categoryUrl = 'promotionstoapprove';
    const url: string = serviceUrl + categoryUrl ;
    return this.httpClient.get<Promotion>(url);
  }
  getApprovedPromotions(serviceUrl): Observable<any> {
    const categoryUrl = 'approvedpromotions';
    const url: string = serviceUrl + categoryUrl ;
    return this.httpClient.get<Promotion>(url);
  }
  approveBanner(serviceUrl, id): Observable<any> {
    const categoryUrl = 'approvebanner/';
    const url: string = serviceUrl + categoryUrl + id;
    return this.httpClient.get<Banner>(url);
  }

  approveCategory(serviceUrl, id): Observable<any> {
    const categoryUrl = 'approveCategory/';
    const url: string = serviceUrl + categoryUrl + id;
    return this.httpClient.get<Banner>(url);
  }
  approveHeader(serviceUrl, id): Observable<any> {
    const categoryUrl = 'approveheader/';
    const url: string = serviceUrl + categoryUrl + id;
    return this.httpClient.get<Banner>(url);
  }
  approvePromotions(serviceUrl, id): Observable<any> {
    const categoryUrl = 'approvepromotions/';
    const url: string = serviceUrl + categoryUrl + id;
    return this.httpClient.get<Promotion>(url);
  }
  // delete

  deleteBanners(serviceUrl, data): Observable<any> {
    const categoryUrl = 'deletebanners/';
    const url: string = serviceUrl + categoryUrl + data._id;
    return this.httpClient.delete<Banner>(url);
  }

  deleteCategoryContent(serviceUrl, data): Observable<any> {
    const categoryUrl = 'deleteads/';
    const url: string = serviceUrl + categoryUrl + data._id;
    return this.httpClient.delete<Banner>(url);
  }

  deletePromotions(serviceUrl, data): Observable<any> {
    const categoryUrl = 'deletepromotions/';
    const url: string = serviceUrl + categoryUrl + data._id;
    return this.httpClient.delete<Promotion>(url);
  }
  deleteHeader(serviceUrl, data): Observable<any> {
    const categoryUrl = 'headerDetails/';
    const url: string = serviceUrl + categoryUrl + data._id;
    return this.httpClient.delete<Promotion>(url);
  }

  // disable

  disableBanners(serviceUrl, data): Observable<any> {
    const categoryUrl = 'disablebanner/';
    const url: string = serviceUrl + categoryUrl + data._id;
    return this.httpClient.get<Banner>(url);
  }

  disableCategory(serviceUrl, data): Observable<any> {
    const categoryUrl = 'disablecategory/';
    const url: string = serviceUrl + categoryUrl + data._id;
    return this.httpClient.get<Banner>(url);
  }
  disablePromotions(serviceUrl, data): Observable<any> {
    const categoryUrl = 'disablepromotions/';
    const url: string = serviceUrl + categoryUrl + data._id;
    return this.httpClient.get<Promotion>(url);
  }

  // region wise orders

  getSingleOrderDetails(serviceUrl, id): Observable<any> {
    const categoryUrl = 'orders/';
    const url: string = serviceUrl + categoryUrl + id;
    return this.httpClient.get<Order>(url);
  }


}
