import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';
import {OrderModel} from '../../shared/models/order.model';

@Injectable({providedIn: 'root'})
export class CartService {

  constructor(private readonly apiService: ApiService) {
  }

  getItems(): Observable<any> {
    return this.apiService.getItems();
  }

  makeOrder(orderModel: OrderModel): Observable<any> {
    return this.apiService.createOrder(orderModel);
  }
}
