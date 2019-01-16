import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {SuperCategory} from './super-category/superCategory.model';
import {MainCategory} from './main-category/mainCategory.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }

getSuperCategory(): Observable<any> {
    const categoryUrl = 'categoryDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<SuperCategory>(url);
  }

  addSuperCategory(data: SuperCategory): Observable<any> {
    const categoryUrl = 'addCategory';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.post<SuperCategory>(url, data);
  }

  deleteSuperCategory(data): Observable<any> {
    const deleteUrl = 'categoryDelete/';
    const url: string = this.serviceUrl + deleteUrl + data._id;
    return this.httpClient.delete<SuperCategory>(url);
  }
  addMainCategory(data: MainCategory): Observable<any> {
    const categoryUrl = 'mainCategory';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.post<MainCategory>(url, data);
  }
  getMainCategory(id): Observable<any> {
    const categoryUrl = 'superCategorydetail/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<MainCategory>(url);
  }
  deleteMainCategory(id, data): Observable<any> {
    const deleteUrl = 'category/';
    const deleteUrl1 = '/mainCategory/';
    const url: string = this.serviceUrl + deleteUrl + id + deleteUrl1 + data._id;
    return this.httpClient.delete<MainCategory>(url);
  }
}
