import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';
import {OrderModel} from '../../shared/models/order.model';

@Injectable({providedIn: 'root'})
export class OrderSummaryService {

  constructor(private readonly apiService: ApiService) {
  }

  getOrder(orderId: any): Observable<any> {
    return this.apiService.getOrder(orderId);
  }

}
