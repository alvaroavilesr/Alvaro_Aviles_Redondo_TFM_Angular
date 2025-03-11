import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Login} from '../shared/models/login.model';
import {ApiService} from '../shared/services/api.service';

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(private readonly apiService: ApiService) {}

  login(loginModel: Login): Observable<any> {
    return this.apiService.login(loginModel);
  }
}
