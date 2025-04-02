import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';
import {CreateUserModel} from '../../shared/models/createUser.model';

@Injectable({providedIn: 'root'})
export class UserManagementService {

  constructor(private readonly apiService: ApiService) {}

  getUsers(): Observable<any> {
    return this.apiService.getUsers();
  }

  createUser(createUserModel: CreateUserModel): Observable<any> {
    return this.apiService.createUser(createUserModel);
  }
}
