import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../shared/services/api.service';
import {Login} from '../shared/models/login.model';

@Injectable({providedIn: 'root'})
export class ProfileService {

  constructor(private readonly apiService: ApiService) {}

  login(loginModel: Login): Observable<any> {
    return this.apiService.login(loginModel);
  }

  updateUserData(field: string, newValue: string): Observable<any> {
    console.log('field: ', field);
    console.log('newValue: ', newValue);
    return this.apiService.updateUserDataProfile(field, newValue);
  }
}
