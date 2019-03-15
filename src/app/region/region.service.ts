import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Region} from '../settings/region/region.model';
import {Banner} from '../region/home-page-content/banner.model';
import {Promotion} from '../region/home-page-content/promotions.model';

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
}
