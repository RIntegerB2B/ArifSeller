import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Region} from './region/region.model';
import {RegionCurrency} from './currency/country-currency';
import {ProductSettings} from './product-settings/product-settings.model';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }
  getCurrency(): Observable<RegionCurrency[]> {
    const url = '../../assets/currency.json';
    return this.httpClient.get<RegionCurrency[]>(url);
  }
  getAllRegions(): Observable<any> {
    const categoryUrl = 'regions';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Region>(url);
  }
  addRegion(data: Region): Observable<any> {
    const regionUrl = 'regions';
    const url: string = this.serviceUrl + regionUrl;
    return this.httpClient.post<Region>(url, data);
  }
  deleteRegion(data): Observable<any> {
    const deleteUrl = 'deleteregions/';
    const url: string = this.serviceUrl + deleteUrl + data._id ;
    return this.httpClient.delete<Region>(url);
  }

  addPriceRange(data: ProductSettings): Observable<any> {
    const settingsUrl = 'pricerange';
    const url: string = this.serviceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deletePriceRange(data): Observable<any> {
    const deleteUrl = 'removeprice';
    const url: string = this.serviceUrl + deleteUrl ;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  addColor(data: ProductSettings): Observable<any> {
    const settingsUrl = 'color';
    const url: string = this.serviceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteColor(data): Observable<any> {
    const deleteUrl = 'removecolor';
    const url: string = this.serviceUrl + deleteUrl ;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  addMaterial(data: ProductSettings): Observable<any> {
    const settingsUrl = 'material';
    const url: string = this.serviceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteMaterial(data): Observable<any> {
    const deleteUrl = 'removematerial';
    const url: string = this.serviceUrl + deleteUrl ;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  getProductSettings(): Observable<any> {
    const categoryUrl = 'productSettings';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<ProductSettings>(url);
  }

}
