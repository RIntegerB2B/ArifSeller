import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Product} from './add-product/product.model';
import {MainCategory} from '../category/main-category/mainCategory.model';
import {MOQ} from '../moq/create-moq/moq.model';

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
  uploadImages(data , styleCode,  skucode): Observable<any> {
    const addUrl = 'product/';
    const addUrl1 = '/images/';
    const url: string = this.serviceUrl + addUrl + styleCode + addUrl1 + skucode ;
    return this.httpClient.put<boolean>(url, data);
  }
getProducts(): Observable<any> {
  const categoryUrl = 'product';
  const url: string = this.serviceUrl + categoryUrl;
  return this.httpClient.get<Product>(url);
}
deleteProduct(data): Observable<any> {
  const deleteUrl = 'product/';
  const deleteUrl1 = '/stylecode/';
  const deleteUrl2 = '/sku/';
  const url: string = this.serviceUrl + deleteUrl + data._id + deleteUrl1 + data.styleCode + deleteUrl2 + data.skuCode;
  return this.httpClient.delete<Product>(url);
}
getProductById(data): Observable<any> {
  const categoryUrl = 'product/';
  const url: string = this.serviceUrl + categoryUrl + data;
  return this.httpClient.get<Product>(url);
}
}
