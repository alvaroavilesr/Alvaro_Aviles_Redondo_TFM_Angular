import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';

@Injectable({providedIn: 'root'})
export class OrderManagementService {

  constructor(private readonly apiService: ApiService) {
  }

  getOrders(): Observable<any> {
    return this.apiService.getOrders();
  }

  deleteOrder(orderId: any): Observable<any> {
    return this.apiService.deleteOrder(orderId);
  }
}
