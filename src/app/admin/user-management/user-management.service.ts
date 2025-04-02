import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';

@Injectable({providedIn: 'root'})
export class UserManagementService {

  constructor(private readonly apiService: ApiService) {}

  getUsers(): Observable<any> {
    return this.apiService.getUsers();
  }
}
