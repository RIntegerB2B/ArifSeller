import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Product} from './add-product/product.model';
import {MainCategory} from '../category/main-category/mainCategory.model';
import {SuperCategory} from '../category/super-category/superCategory.model';
import {MOQ} from '../moq/create-moq/moq.model';
import {Region} from '../product/add-product/region.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }
  showMoq(): Observable<any> {
    const categoryUrl = 'moqs';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<MOQ>(url);
  }
  showAllSuperCategory(): Observable<any> {
    const categoryUrl = 'categoryDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<SuperCategory>(url);
  }
  showAllMainCategory(): Observable<any> {
    const categoryUrl = 'showMainCategory';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<MainCategory>(url);
  }
  addProduct(data: Product): Observable<any> {
    const categoryUrl = 'product';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.post<Product>(url, data);
  }
  addMOQ(moqid, productid): Observable<any> {
    const categoryUrl = 'addMoq/';
    const productUrl = '/product/';
    const url: string = this.serviceUrl + categoryUrl + moqid + productUrl + productid;
    return this.httpClient.get<MOQ>(url);
  }
  uploadImages(data, skucode): Observable<any> {
    const addUrl = 'productimages/';
    const url: string = this.serviceUrl + addUrl + skucode ;
    return this.httpClient.put<Product>(url, data);
  }
getProducts(): Observable<any> {
  const categoryUrl = 'product';
  const url: string = this.serviceUrl + categoryUrl;
  return this.httpClient.get<Product>(url);
}
getAllRegions(): Observable<any> {
  const categoryUrl = 'regions';
  const url: string = this.serviceUrl + categoryUrl;
  return this.httpClient.get<Region>(url);
}
deleteProduct(data): Observable<any> {
  const deleteUrl = 'product/';
  const deleteUrl1 = '/sku/';
  const url: string = this.serviceUrl + deleteUrl + data._id + deleteUrl1 + data.skuCode;
  return this.httpClient.delete<Product>(url);
}
getProductById(data): Observable<any> {
  const productUrl = 'product/';
  const url: string = this.serviceUrl + productUrl + data;
  return this.httpClient.get<Product>(url);
}
getRelatedProducts(data): Observable<any> {
  const productUrl = 'relatedproducts/';
  const productUrl1 = '/product/';
  const url: string = this.serviceUrl + productUrl + data.styleCode + productUrl1 + data._id;
  return this.httpClient.get<Product>(url);
}

editRegionDetails(elem, data, regionDetails: Region): Observable<any> {
  const addUrl = 'product/';
  const addurl1 = '/region/';
  const url: string = this.serviceUrl + addUrl + elem  + addurl1 + data;
  return this.httpClient.put<Product>(url, regionDetails);
}
editQtyDetails(elem,  productDetails: Product): Observable<any> {
  const addUrl = 'mfdqty/';
  const url: string = this.serviceUrl + addUrl + elem ;
  return this.httpClient.put<Product>(url, productDetails);
}
}
