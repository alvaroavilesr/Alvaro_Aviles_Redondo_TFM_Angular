import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';

@Injectable({providedIn: 'root'})
export class OwnOrdersService {

  constructor(private readonly apiService: ApiService) {
  }

  getUserOrders(): Observable<any> {
    return this.apiService.getUserOrders();
  }

  deleteOrder(orderId: any): Observable<any> {
    return this.apiService.deleteOrder(orderId);
  }
}
