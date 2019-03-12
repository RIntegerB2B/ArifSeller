import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Region} from '../settings/region/region.model';

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
}
