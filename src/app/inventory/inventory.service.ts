import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Inventory} from './inventory-health/inventory.model';
import {Product} from '../product/add-product/product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }
  showInventory(): Observable<any> {
    const categoryUrl = 'inventoryDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Product>(url);
  }
}
