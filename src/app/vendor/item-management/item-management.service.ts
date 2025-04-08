import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';

@Injectable({providedIn: 'root'})
export class ItemManagementService {

  constructor(private readonly apiService: ApiService) {
  }

  getItems(): Observable<any> {
    return this.apiService.getItems();
  }

  getCategories(): Observable<any> {
    return this.apiService.getCategories();
  }

  createItem(createItemModel: any, createItemCategory: any): Observable<any> {
    return this.apiService.createItem(createItemModel, createItemCategory);
  }

  deleteItem(itemId: any): Observable<any> {
    return this.apiService.deleteItem(itemId);
  }

  updateItem(updatedItem: any): Observable<any> {
    return this.apiService.updateItem(updatedItem);
  }

  updateItemCategory(itemId: any, updatedCategory: any): Observable<any> {
    return this.apiService.updateItemCategory(itemId, updatedCategory);
  }
}
