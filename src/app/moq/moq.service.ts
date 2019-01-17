import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {MOQ} from './create-moq/moq.model';

@Injectable({
  providedIn: 'root'
})
export class MoqService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }

  createMOQ(data: MOQ): Observable<any> {
    const categoryUrl = 'createMoq';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.post<MOQ>(url, data);
  }
}
