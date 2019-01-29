import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Region} from './region/region.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }
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
}
