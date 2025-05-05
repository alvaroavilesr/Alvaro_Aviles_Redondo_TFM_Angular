import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';

@Injectable({providedIn: 'root'})
export class ShopService {

  constructor(private readonly apiService: ApiService) {
  }

  getItems(): Observable<any> {
    return this.apiService.getItems();
  }

  getCategories(): Observable<any> {
    return this.apiService.getCategories();
  }
}
