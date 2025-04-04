import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';

@Injectable({providedIn: 'root'})
export class CategoryManagementService {

  constructor(private readonly apiService: ApiService) {}

  getCategories(): Observable<any> {
    return this.apiService.getCategories();
  }

  createCategory(createCategoryName: any): Observable<any> {
    return this.apiService.createCategory(createCategoryName);
  }

  updateCategory(updateCategoryName: any, id: any): Observable<any> {
    return this.apiService.updateCategory(updateCategoryName, id);
  }

  deleteCategory(id: any): Observable<any> {
    return this.apiService.deleteCategory(id);
  }
}
