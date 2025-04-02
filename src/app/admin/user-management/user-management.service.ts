import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';
import {CreateUserModel} from '../../shared/models/createUser.model';
import {Login} from '../../shared/models/login.model';

@Injectable({providedIn: 'root'})
export class UserManagementService {

  constructor(private readonly apiService: ApiService) {}

  login(loginModel: Login): Observable<any> {
    return this.apiService.login(loginModel);
  }

  getUsers(): Observable<any> {
    return this.apiService.getUsers();
  }

  createUser(createUserModel: CreateUserModel): Observable<any> {
    return this.apiService.createUser(createUserModel);
  }

  updateUserData(updateUserData: any): Observable<any> {
    return this.apiService.updateUserData(updateUserData);
  }

  updateUserPassword(user: any, newPass: string): Observable<any> {
    return this.apiService.updateUserPassword(user, newPass);
  }
}
