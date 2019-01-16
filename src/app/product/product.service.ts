import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Product} from './add-product/product.model';
import {PrimeImageData} from './add-product/primeImageData.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }

  addProduct(data: Product): Observable<any> {
    const categoryUrl = 'product';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.post<Product>(url, data);
  }
  uploadprimeImage(primeImageData: PrimeImageData , skucode): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', primeImageData.primeImage, primeImageData.primeImage.name);
    const addUrl = 'productImage/';
    const url: string = this.serviceUrl + addUrl + skucode ;
    return this.httpClient.put<boolean>(url, formData);
  }
getProducts(): Observable<any> {
  const categoryUrl = 'product';
  const url: string = this.serviceUrl + categoryUrl;
  return this.httpClient.get<Product>(url);
}
deleteProduct(data): Observable<any> {
  const deleteUrl = 'product/';
  const deleteUrl1 = '/sku/';
  const url: string = this.serviceUrl + deleteUrl + data._id + deleteUrl1 + data.skuCode;
  return this.httpClient.delete<Product>(url);
}
getProductById(data): Observable<any> {
  const categoryUrl = 'product/';
  const url: string = this.serviceUrl + categoryUrl + data;
  return this.httpClient.get<Product>(url);
}
}
